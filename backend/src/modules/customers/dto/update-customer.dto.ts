import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CustomerStatus } from '@prisma/client';

// All fields optional for partial updates.
export class UpdateCustomerDto {
  @IsOptional() @IsString()
  customerCode?: string;

  @IsOptional() @IsString()
  companyName?: string;

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
