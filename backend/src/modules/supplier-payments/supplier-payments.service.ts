import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SupplierPaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(params: { supplierId?: string; orderId?: string }) {
    return this.prisma.supplierPayment.findMany({
      where: {
        supplierId: params.supplierId,
        orderId: params.orderId,
      },
      orderBy: { paymentDate: 'desc' },
    });
  }
}
