import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class FilterRestaurantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  promotion?: string;

  @IsOptional()
  @IsString()
  chiefStatus?: string;

  @IsOptional()
  @IsString()
  employerStatus?: string;
}
