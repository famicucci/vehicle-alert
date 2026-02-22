import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './typeorm.config';
import { TestCasesModule } from './test-cases/test-cases.module';
import { TestsModule } from './tests/tests.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TestCasesModule, TestsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
