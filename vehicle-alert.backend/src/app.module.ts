import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { ColorsModule } from './colors/colors.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), ColorsModule, BrandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
