import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { AuthUser } from '../../common/decorators/current-user.decorator';

/**
 * Verifies the Supabase access token (HS256, signed with the project JWT secret).
 * Find the secret in: Supabase Dashboard > Project Settings > API > JWT Secret.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('SUPABASE_JWT_SECRET') ?? 'missing-secret',
    });
  }

  validate(payload: Record<string, any>): AuthUser {
    return {
      id: payload.sub,
      email: payload.email,
      // Set a custom claim `role` in Supabase, or fall back to STAFF.
      role: payload.app_metadata?.role ?? payload.role ?? 'STAFF',
    };
  }
}
