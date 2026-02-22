import { TestCase } from "@/interfaces/testCase";

export type CreateTestCaseInput = Omit<TestCase, "id">;

export interface TestCaseState {
  testCases: TestCase[];
  search: string;
  status: TestCaseStatus;
  setSearch: (search: string) => void;
  fetchTestCases: (search: string) => Promise<void>;
  createTestCase: (payload: CreateTestCaseInput) => Promise<TestCase>;
  deleteTestCase: (id: number) => Promise<void>;
}

export type TestCaseStatus = "iddle" | "loading" | "succeeded" | "failed";
