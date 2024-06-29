import { SelectQueryBuilder } from 'typeorm';

export class PaginatedOption {
  page: number;
  limit: number;

  constructor(page = 1, limit = 10) {
    this.page = page;
    this.limit = limit;
  }
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export async function pagination<T>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginatedOption,
): Promise<PaginatedResult<T>> {

  const offset = (options.page - 1) * options.limit;

  queryBuilder.skip(offset).take(options.limit);

  const [items, totalItems] = await queryBuilder.getManyAndCount();

  const totalPages = Math.ceil(totalItems / options.limit);

  return {
    items,
    meta: {
      totalItems,
      itemCount: items.length,
      itemsPerPage: options.limit,
      totalPages,
      currentPage: options.page,
    },
  };
}
