import { create } from "zustand";
import { CreateTestInput, TestState } from "./types";
import { Test } from "@/interfaces/test";

const useTest = create<TestState>((set) => ({
  tests: [],
  search: "",
  status: "iddle",
  setSearch: (search) => set({ search }),
  fetchTests: async (search) => {
    set({ status: "loading" });
    try {
      const res = await fetch(
        `http://localhost:4000/tests?search=${encodeURIComponent(search)}`,
      );
      const data: Test[] = await res.json();
      set({
        tests: data,
        status: "succeeded",
      });
    } catch (err) {
      set({ status: "failedFetchingTests" });
    }
  },
  createTest: async (payload: CreateTestInput) => {
    set({ status: "loading" });
    try {
      const res = await fetch("http://localhost:4000/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create test");
      }

      const created: Test = await res.json();

      set((state) => ({
        tests: [created, ...state.tests],
        status: "succeeded",
      }));

      return created;
    } catch (err) {
      set({ status: "failedCreatingTest" });
      throw err;
    }
  },
  deleteTest: async (id: number) => {
    set({ status: "loading" });
    try {
      const res = await fetch(`http://localhost:4000/tests/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete test");
      }

      set((state) => ({
        tests: state.tests.filter((test) => test.id !== id),
        status: "succeeded",
      }));
    } catch (err) {
      set({ status: "failedDeletingTest" });
      throw err;
    }
  },
}));

export default useTest;
