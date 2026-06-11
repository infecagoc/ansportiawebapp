import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Profit & Loss per order: sale - cost - expenses.
   * TODO: aggregate order_items + expenses for true P&L.
   */
  async profitAndLoss() {
    const orders = await this.prisma.order.count();
    return { orders, lines: [] as unknown[] };
  }
}
