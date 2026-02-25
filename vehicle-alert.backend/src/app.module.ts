import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), ColorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
