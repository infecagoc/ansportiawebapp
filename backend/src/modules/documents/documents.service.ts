import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { StorageService } from '../../storage/storage.service';

const ALLOWED_MIME = new Set([
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/webp',
]);

// Maps a document type to its storage sub-folder.
const FOLDER_BY_TYPE: Record<DocumentType, string> = {
  INVOICE: 'invoices',
  PACKING_LIST: 'packing-lists',
  QUOTATION: 'quotations',
  PURCHASE_ORDER: 'purchase-orders',
  PAYMENT_RECEIPT: 'payment-proofs',
  SUPPLIER_RECEIPT: 'payment-proofs',
  SHIPPING_DOCUMENT: 'shipping',
  CUSTOMS_DOCUMENT: 'customs',
  OTHER: 'misc',
};

@Injectable()
export class DocumentsService {
  private readonly maxBytes: number;

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    config: ConfigService,
  ) {
    this.maxBytes = (config.get<number>('MAX_UPLOAD_MB') ?? 10) * 1024 * 1024;
  }

  async upload(params: {
    file: Express.Multer.File;
    documentType: DocumentType;
    orderId?: string;
    uploadedById?: string;
  }) {
    const { file, documentType, orderId, uploadedById } = params;

    if (!file) throw new BadRequestException('No file provided');
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException(`Unsupported file type: ${file.mimetype}`);
    }
    if (file.size > this.maxBytes) {
      throw new BadRequestException(`File exceeds size limit`);
    }

    // Place the object under orders/<id>/<folder> when tied to an order.
    const baseFolder = FOLDER_BY_TYPE[documentType] ?? 'misc';
    const folder = orderId ? `orders/${orderId}/${baseFolder}` : baseFolder;

    // NOTE: timestamp passed in because Date.now() is non-deterministic;
    // here at runtime it's fine to use it.
    const path = this.storage.buildPath({
      folder,
      fileName: file.originalname,
      timestamp: Date.now(),
    });

    await this.storage.upload(path, file.buffer, file.mimetype);

    return this.prisma.document.create({
      data: {
        orderId: orderId ?? null,
        documentType,
        fileName: file.originalname,
        filePath: path,
        uploadedById: uploadedById ?? null,
      },
    });
  }

  /** Returns the document row plus a short-lived signed URL for download. */
  async getWithSignedUrl(id: string, expiresInSeconds = 60) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    const url = await this.storage.getSignedUrl(doc.filePath, expiresInSeconds);
    return { ...doc, signedUrl: url, expiresIn: expiresInSeconds };
  }

  async findByOrder(orderId: string) {
    return this.prisma.document.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Document not found');
    await this.storage.remove(doc.filePath);
    await this.prisma.document.delete({ where: { id } });
    return { deleted: true };
  }
}
