import { Test } from "@/interfaces/test";

export type CreateTestInput = Omit<Test, "id" | "testCase"> & {
  testCaseId: number;
};

export interface TestState {
  tests: Test[];
  search: string;
  status: TestStatus;
  setSearch: (search: string) => void;
  fetchTests: (search: string) => Promise<void>;
  createTest: (payload: CreateTestInput) => Promise<Test>;
  deleteTest: (id: number) => Promise<void>;
}

export type TestStatus =
  | "iddle"
  | "loading"
  | "succeeded"
  | "failedCreatingTest"
  | "failedDeletingTest"
  | "failedFetchingTests";
