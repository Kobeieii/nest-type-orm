import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  promotion: string;

  @IsNotEmpty()
  @IsNumber()
  customers: number;
}
