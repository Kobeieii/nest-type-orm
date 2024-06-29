import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  DefaultValuePipe,
  NotFoundException,
} from '@nestjs/common';
import { RestaurantService } from '../services';
import { CreateRestaurantDto, UpdateRestaurantDto, FilterRestaurantDto } from '../dtos';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantService.findOne(id);

    if (!restaurant) {
      throw new NotFoundException(`ID ${id} not found.`);
    }

    const restaurantUpdated = await this.restaurantService.update(
      restaurant,
      dto,
    );
    return restaurantUpdated;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const restaurant = await this.restaurantService.findOne(id);

    if (!restaurant) {
      throw new NotFoundException(`ID ${id} not found.`);
    }

    return restaurant;
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query() filterDto: FilterRestaurantDto,
  ) {
    const options = { page, limit };
    return this.restaurantService.findAll(options, filterDto);
  }
}
