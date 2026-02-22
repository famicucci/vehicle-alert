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
    <div>
      <div className="flex items-center justify-between py-2 px-2">
        <div className="flex items-center justify-start">
          <Menu />
          {/* <Typography variant="h3" className="mr-2">
            Test Cases
          </Typography> */}
          <InputView
            placeholder="Buscar..."
            onChange={(e) => {
              setTimeout(() => {
                setSearch(e.target.value);
              }, 1000);
            }}
          />
        </div>
        <div>
          <Button
            onClick={() =>
              show("Crear un Test Case", () => (
                <ModalContent>
                  <TestCaseForm onSubmit={() => hide()} />
                </ModalContent>
              ))
            }
          >
            Crear Test Case
          </Button>
        </div>
      </div>
      <TestCases />
    </div>
  );
};

export default Page;
