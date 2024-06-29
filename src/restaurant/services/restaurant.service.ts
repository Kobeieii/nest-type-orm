import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  FilterRestaurantDto,
} from '../dtos';
import { Restaurant } from '../entities';
import { pagination, PaginatedOption, PaginatedResult } from 'src/helper';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restuarantRepository: Repository<Restaurant>,
  ) {}

  create(dto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restuarantRepository.create(dto);
    return this.restuarantRepository.save(restaurant);
  }

  async findOne(id: number): Promise<Restaurant | null> {
    const restaurant = await this.restuarantRepository.findOneBy({
      id: id,
    });
    if (!restaurant) {
      return null;
    }
    return restaurant;
  }

  async findAll(
    options: PaginatedOption,
    filterDto: FilterRestaurantDto,
  ): Promise<PaginatedResult<Restaurant>> {
    const qb = this.restuarantRepository.createQueryBuilder('restaurant');
    const { name, promotion, chiefStatus, employerStatus } = filterDto;
    if (name) {
      qb.andWhere('restaurant.name LIKE :name', { name: `%${name}%` });
    }
    if (promotion) {
      qb.andWhere('restaurant.promotion LIKE :promotion', { promotion: `%${promotion}%` });
    }
    if (chiefStatus) {
      qb.andWhere('restaurant.chiefStatus = :chiefStatus', { chiefStatus: `${chiefStatus==='true'?true:false}` });
    }
    if (employerStatus) {
      qb.andWhere('restaurant.employerStatus = :employerStatus', { employerStatus: `${employerStatus==='true'?true:false}` });
    }

    const res = await pagination(qb, options);
    return res;
  }

  async update(
    restaurant: Restaurant,
    dto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    for (const field of Object.keys(dto)) {
      restaurant[field] = dto[field];
    }
    const restuarantUpdated = await this.restuarantRepository.save(restaurant);
    return restuarantUpdated;
  }
}
