import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @IsBoolean()
  @IsOptional()
  chiefStatus?: boolean;

  @IsBoolean()
  @IsOptional()
  employerStatus?: boolean;
}
