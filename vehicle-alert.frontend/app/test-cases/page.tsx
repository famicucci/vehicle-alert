"use client";
import React from "react";
import TestCases from "./components/TestCases";
import TestCaseForm from "./components/TestCaseForm";
import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { ModalContent } from "@/components/Modal/ModalContent";
import { InputView } from "@/components/Input";
import useTestCase from "@/store/testCase/testCase";
import Menu from "@/components/Menu/Menu";

const Page = () => {
  const { show, hide } = useModal();
  const { setSearch } = useTestCase();

  return (
    <div className="flex flex-col gap-4">
      <InputView
        placeholder="Buscar..."
        onChange={(e) => {
          setTimeout(() => {
            setSearch(e.target.value);
          }, 1000);
        }}
      />
      <TestCases />
    </div>
  );
};

export default Page;
