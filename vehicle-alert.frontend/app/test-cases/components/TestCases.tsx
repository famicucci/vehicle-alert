"use client";

import { IconButton } from "@/components/IconButton";
import { Table } from "@/components/Table";
import { Column } from "@/components/Table/types";
import { TestCase } from "@/interfaces/testCase";
import useTestCase from "@/store/testCase/testCase";
import { useEffect } from "react";
import { Trash } from "react-feather";

const TestCases = () => {
  const { testCases, fetchTestCases, status, deleteTestCase, search } =
    useTestCase();

  useEffect(() => {
    fetchTestCases(search);
  }, [fetchTestCases, search]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading test cases</div>;
  }

  const columns: Column<TestCase>[] = [
    {
      id: "id",
      name: "N°",
      selector: "id",
      align: "center",
    },
    {
      id: "section",
      name: "Sección",
      selector: "section",
    },
    {
      id: "title",
      name: "Título",
      selector: "title",
    },
    {
      id: "steps",
      name: "Pasos",
      selector: "steps",
    },
    // {
    //   id: "testData",
    //   name: "Datos de Prueba",
    //   selector: "testData",
    // },
    {
      id: "expectedResult",
      name: "Resultado Esperado",
      selector: "expectedResult",
    },
    {
      id: "platform",
      name: "Plataforma",
      selector: "platform",
      align: "center",
    },
    {
      id: "priority",
      name: "Prioridad",
      selector: "priority",
      align: "center",
    },
    {
      id: "actions",
      name: "",
      cell: (row: any) => (
        <IconButton
          variant="secondary"
          size="medium"
          onClick={() => deleteTestCase(row.id)}
        >
          <Trash size={20} />
        </IconButton>
      ),
    },
  ];

  return <Table data={testCases} columns={columns} />;
};

export default TestCases;
