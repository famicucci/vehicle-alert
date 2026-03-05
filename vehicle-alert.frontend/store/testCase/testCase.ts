import { create } from "zustand";
import { TestCaseState } from "./types";

const useTestCase = create<TestCaseState>((set) => ({
  testCases: [],
  status: "iddle",
  search: "",
  setSearch: (search) => set({ search }),
}));

export default useTestCase;
