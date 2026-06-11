import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Financial + order overview widgets.
   * TODO: replace counts with real profit/receivables/payables aggregations
   * once orders & payments data exists.
   */
  async overview() {
    const [customers, suppliers, orders] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.supplier.count(),
      this.prisma.order.count(),
    ]);

    return {
      customers,
      suppliers,
      orders,
      financial: {
        totalSales: 0,
        totalPurchaseCost: 0,
        grossProfit: 0,
        netProfit: 0,
        outstandingReceivables: 0,
        outstandingPayables: 0,
      },
    };
  }
}
