import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { TestCasesModule } from './test-cases/test-cases.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TestCasesModule, ColorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
