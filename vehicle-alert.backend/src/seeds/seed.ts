import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { testCasesMocks } from '../test-cases/mocks/test-cases.mock';
import { TestCasesService } from '../test-cases/test-cases.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const testCasesService = app.get(TestCasesService);

  await Promise.all(
    testCasesMocks.map((q) => testCasesService.createTestCase(q)),
  );

  await app.close();
}

bootstrap();
