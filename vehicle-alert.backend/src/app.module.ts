import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { TestCasesModule } from './test-cases/test-cases.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TestCasesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
