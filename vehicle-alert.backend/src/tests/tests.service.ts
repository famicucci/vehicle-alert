import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tests as TestsEntity } from './tests.entity';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dtos/create-test.dto';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(TestsEntity)
    private testsRepository: Repository<TestsEntity>,
  ) {}

  getTests(search?: string): Promise<TestsEntity[]> {
    if (!search) {
      return this.testsRepository.find({
        relations: ['testCase'],
      });
    }

    return this.testsRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.testCase', 'testCase')
      .where('test.ticketId LIKE :search', { search: `%${search}%` })
      .orWhere('test.qaStatus LIKE :search', { search: `%${search}%` })
      .orWhere('test.version LIKE :search', { search: `%${search}%` })
      .orWhere('test.observations LIKE :search', { search: `%${search}%` })
      .orWhere('testCase.title LIKE :search', { search: `%${search}%` })
      .getMany();
  }

  async createTest(test: CreateTestDto): Promise<TestsEntity> {
    const { testCaseId, ...testData } = test;

    const testEntity = this.testsRepository.create({
      ...testData,
      testCase: { id: testCaseId } as any,
    });

    const savedTest = await this.testsRepository.save(testEntity);

    return this.testsRepository.findOne({
      where: { id: savedTest.id },
      relations: ['testCase'],
    }) as Promise<TestsEntity>;
  }

  async deleteTest(id: string): Promise<void> {
    await this.testsRepository.delete(id);
  }
}
