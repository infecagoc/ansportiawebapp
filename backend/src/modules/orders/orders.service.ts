import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { customer: true, supplier: true },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        supplier: true,
        items: { include: { product: true } },
        expenses: true,
        documents: true,
        customerPayments: true,
        supplierPayments: true,
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
