import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestCases as TestCasesEntity } from './test-cases.entity';
import { Repository } from 'typeorm';
import { CreateTestCasesDto } from './dtos/create-test-case.dto';

@Injectable()
export class TestCasesService {
  constructor(
    @InjectRepository(TestCasesEntity)
    private testCasesRepository: Repository<TestCasesEntity>,
  ) {}

  getTestCases(search?: string): Promise<TestCasesEntity[]> {
    if (!search) {
      return this.testCasesRepository.find();
    }

    return this.testCasesRepository
      .createQueryBuilder('testCase')
      .where('testCase.title LIKE :search', { search: `%${search}%` })
      .orWhere('testCase.section LIKE :search', { search: `%${search}%` })
      .orWhere('testCase.platform LIKE :search', { search: `%${search}%` })
      .orWhere('testCase.priority LIKE :search', { search: `%${search}%` })
      .getMany();
  }

  createTestCase(testCase: CreateTestCasesDto): Promise<TestCasesEntity> {
    const testCaseEntity = this.testCasesRepository.create({
      ...testCase,
    });

    return this.testCasesRepository.save(testCaseEntity);
  }

  async deleteTestCase(id: string): Promise<void> {
    await this.testCasesRepository.delete(id);
  }
}
