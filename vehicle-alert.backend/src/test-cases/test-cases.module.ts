import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestCasesService } from './test-cases.service';
import { TestCases } from './test-cases.entity';
import { TestCasesController } from './test-cases.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestCases])],
  controllers: [TestCasesController],
  providers: [TestCasesService],
})
export class TestCasesModule {}
