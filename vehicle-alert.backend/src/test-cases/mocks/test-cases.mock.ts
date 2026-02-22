import { CreateTestCasesDto } from '../dtos/create-test-case.dto';

export const testCasesMocks: CreateTestCasesDto[] = [
  {
    section: 'Functional',
    testType: 'Positive',
    preconditions: 'User is on the login page',
    scope: 'Login functionality',
    title: 'Login with valid credentials',
    steps:
      '1. Go to the login page\n2. Enter valid username and password\n3. Click on the login button',
    testData: 'Username: user1, Password: pass123',
    expectedResult:
      'User should be logged in successfully and redirected to the dashboard',
    platform: 'Web',
    priority: 'High',
  },
];
