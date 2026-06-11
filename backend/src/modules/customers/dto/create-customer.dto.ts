import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CustomerStatus } from '@prisma/client';

export class CreateCustomerDto {
  @IsString()
  customerCode!: string;

  @IsString()
  companyName!: string;

  @IsOptional() @IsString()
  contactPerson?: string;

  @IsOptional() @IsString()
  phone?: string;

  @IsOptional() @IsEmail()
  email?: string;

  @IsOptional() @IsString()
  address?: string;

  @IsOptional() @IsString()
  country?: string;

  @IsOptional() @IsNumber() @Min(0)
  creditLimit?: number;

  @IsOptional() @IsEnum(CustomerStatus)
  status?: CustomerStatus;
}
