import { TestCase } from "@/interfaces/testCase";

export type CreateTestCaseInput = Omit<TestCase, "id">;

export interface VehicleState {
  vehicles: Vehicle[];
  search: string;
  status: Status;
  setSearch: (search: string) => void;
}

export type Status = "iddle" | "loading" | "succeeded" | "failed";

export interface Vehicle {
  id: number;
  plateNumber: string;
  brand: Brand;
  color: Color;
  status: VehicleStatus;
  selectedAnswer: null;
}

export interface Brand {
  id: number;
  name: string;
}

export interface VehicleStatus {
  id: number;
  name: string;
}

export interface Color {
  id: number;
  name: string;
  code: string;
}
