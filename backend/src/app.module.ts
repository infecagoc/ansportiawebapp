import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './storage/storage.module';
import { HealthController } from './health.controller';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ExpensesModule } from './modules/expenses/expenses.module';
import { CustomerPaymentsModule } from './modules/customer-payments/customer-payments.module';
import { SupplierPaymentsModule } from './modules/supplier-payments/supplier-payments.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ReportsModule } from './modules/reports/reports.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // Loads ./.env (backend/.env) then falls back to ../.env (repo root)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../.env'],
    }),
    PrismaModule,
    StorageModule,

    AuthModule,
    UsersModule,
    CustomersModule,
    SuppliersModule,
    ProductsModule,
    OrdersModule,
    ExpensesModule,
    CustomerPaymentsModule,
    SupplierPaymentsModule,
    DocumentsModule,
    ReportsModule,
    DashboardModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
