import { TestCase } from "@/interfaces/testCase";

export type CreateTestCaseInput = Omit<TestCase, "id">;

export interface TestCaseState {
  testCases: TestCase[];
  search: string;
  status: TestCaseStatus;
  setSearch: (search: string) => void;
}

export type TestCaseStatus = "iddle" | "loading" | "succeeded" | "failed";

export interface Vehicle {
  id: number;
  plateNumber: string;
  brand: Brand;
  color: Color;
  status: Brand;
  selectedAnswer: null;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  code: string;
}
