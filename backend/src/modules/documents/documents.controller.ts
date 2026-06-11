import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { UploadDocumentDto } from './dto/upload-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documents: DocumentsService) {}

  // POST /api/v1/documents  (multipart/form-data: file + documentType + orderId?)
  // TODO: protect with @UseGuards(JwtAuthGuard) and read uploadedById from req.user
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadDocumentDto,
  ) {
    return this.documents.upload({
      file,
      documentType: dto.documentType,
      orderId: dto.orderId,
    });
  }

  // GET /api/v1/documents/:id  -> document + short-lived signed download URL
  @Get(':id')
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documents.getWithSignedUrl(id);
  }

  // GET /api/v1/documents?orderId=...
  @Get()
  listByOrder(@Query('orderId', ParseUUIDPipe) orderId: string) {
    return this.documents.findByOrder(orderId);
  }

  // DELETE /api/v1/documents/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.documents.remove(id);
  }
}
