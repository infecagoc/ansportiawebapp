import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * StorageService — wraps Supabase Storage (the free replacement for Cloudflare R2).
 *
 * Design notes:
 *  - Uses the SERVICE ROLE key, so it bypasses RLS. Keep this server-side ONLY.
 *  - Files live in ONE private bucket (SUPABASE_STORAGE_BUCKET).
 *  - We store the object PATH in the DB (Document.filePath / *.proofUrl),
 *    NOT a public URL. Private files are served via short-lived signed URLs.
 *
 * To swap providers later (R2 / Backblaze B2), only this file changes —
 * the rest of the app talks to upload()/getSignedUrl()/remove().
 */
@Injectable()
export class StorageService implements OnModuleInit {
  private client!: SupabaseClient;
  private bucket!: string;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const url = this.config.get<string>('SUPABASE_URL');
    const serviceKey = this.config.get<string>('SUPABASE_SERVICE_ROLE_KEY');
    this.bucket = this.config.get<string>('SUPABASE_STORAGE_BUCKET') ?? 'ansportia-documents';

    if (!url || !serviceKey) {
      throw new InternalServerErrorException(
        'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set',
      );
    }

    this.client = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  /**
   * Build a deterministic, collision-safe object path.
   * Example: orders/<orderId>/invoices/1718000000-invoice.pdf
   */
  buildPath(parts: { folder: string; fileName: string; timestamp: number }): string {
    const safeName = parts.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `${parts.folder}/${parts.timestamp}-${safeName}`;
  }

  /** Upload a buffer. Returns the stored object path. */
  async upload(
    path: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<string> {
    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(path, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      throw new InternalServerErrorException(`Upload failed: ${error.message}`);
    }
    return path;
  }

  /**
   * Generate a short-lived signed URL for a private object.
   * @param expiresInSeconds default 60s — keep financial docs short-lived.
   */
  async getSignedUrl(path: string, expiresInSeconds = 60): Promise<string> {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .createSignedUrl(path, expiresInSeconds);

    if (error || !data) {
      throw new InternalServerErrorException(
        `Could not sign URL: ${error?.message ?? 'unknown error'}`,
      );
    }
    return data.signedUrl;
  }

  /** Delete an object. Safe to call even if the object is already gone. */
  async remove(path: string): Promise<void> {
    const { error } = await this.client.storage.from(this.bucket).remove([path]);
    if (error) {
      throw new InternalServerErrorException(`Delete failed: ${error.message}`);
    }
  }
}
