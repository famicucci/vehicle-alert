import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tests } from './tests.entity';
import { TestsService } from './tests.service';
import { TestsController } from './tests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tests])],
  controllers: [TestsController],
  providers: [TestsService],
})
export class TestsModule {}
