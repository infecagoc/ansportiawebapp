import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CustomerPaymentsService } from './customer-payments.service';

@UseGuards(JwtAuthGuard)
@Controller('customer-payments')
export class CustomerPaymentsController {
  constructor(private readonly payments: CustomerPaymentsService) {}

  // GET /api/v1/customer-payments?customerId=...&orderId=...
  @Get()
  findAll(
    @Query('customerId') customerId?: string,
    @Query('orderId') orderId?: string,
  ) {
    return this.payments.findAll({ customerId, orderId });
  }
}
