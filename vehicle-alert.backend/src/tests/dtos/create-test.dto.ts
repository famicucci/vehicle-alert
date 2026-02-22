import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateTestDto {
  @IsString()
  ticketId: string;

  @IsString()
  result: string;

  @IsDateString()
  date: string;

  @IsString()
  version: string;

  @IsString()
  observations: string;

  @IsNumber()
  testCaseId: number;
}
