import { TestCase } from "./testCase";

export interface Test {
  id: number;
  ticketId: string;
  result: string;
  date: string;
  version: string;
  observations: string;
  testCase: TestCase;
}
