import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { DocumentType } from '@prisma/client';

export class UploadDocumentDto {
  @IsEnum(DocumentType)
  documentType!: DocumentType;

  @IsOptional()
  @IsUUID()
  orderId?: string;
}
