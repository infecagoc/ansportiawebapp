import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomerPaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(params: { customerId?: string; orderId?: string }) {
    return this.prisma.customerPayment.findMany({
      where: {
        customerId: params.customerId,
        orderId: params.orderId,
      },
      orderBy: { paymentDate: 'desc' },
    });
  }
}
