export interface TestCase {
  id: number;
  section: string;
  title: string;
  steps: string;
  testData: string;
  expectedResult: string;
  platform: string;
  priority: string;
}
