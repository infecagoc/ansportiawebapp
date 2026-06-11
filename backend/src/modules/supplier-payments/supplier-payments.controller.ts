import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SupplierPaymentsService } from './supplier-payments.service';

@UseGuards(JwtAuthGuard)
@Controller('supplier-payments')
export class SupplierPaymentsController {
  constructor(private readonly payments: SupplierPaymentsService) {}

  // GET /api/v1/supplier-payments?supplierId=...&orderId=...
  @Get()
  findAll(
    @Query('supplierId') supplierId?: string,
    @Query('orderId') orderId?: string,
  ) {
    return this.payments.findAll({ supplierId, orderId });
  }
}
