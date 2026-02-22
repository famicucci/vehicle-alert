import { IsString } from 'class-validator';

export class CreateTestCasesDto {
  @IsString()
  section: string;

  @IsString()
  testType: string;

  @IsString()
  preconditions: string;

  @IsString()
  scope: string;

  @IsString()
  title: string;

  @IsString()
  steps: string;

  @IsString()
  testData: string;

  @IsString()
  expectedResult: string;

  @IsString()
  platform: string;

  @IsString()
  priority: string;
}
