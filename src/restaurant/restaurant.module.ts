import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './entities';
import * as Services from './services'
import * as Controllers from './controllers'

@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  controllers: [...Object.values(Controllers)],
  providers: [...Object.values(Services)],
})
export class RestaurantModule {}
