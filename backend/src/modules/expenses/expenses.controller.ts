import { Controller, Get, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ExpensesService } from './expenses.service';

@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expenses: ExpensesService) {}

  // GET /api/v1/expenses?orderId=...
  @Get()
  findByOrder(@Query('orderId', ParseUUIDPipe) orderId: string) {
    return this.expenses.findByOrder(orderId);
  }
}
