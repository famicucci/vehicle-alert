"use client";

import { IconButton } from "@/components/IconButton";
import { Table } from "@/components/Table";
import { Column } from "@/components/Table/types";
import { Test } from "@/interfaces/test";
import useTest from "@/store/test/test";
import { useEffect } from "react";
import { Trash } from "react-feather";

const Tests = () => {
  const { tests, fetchTests, status, deleteTest, search } = useTest();

  useEffect(() => {
    fetchTests(search);
  }, [fetchTests, search]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failedFetchingTests") {
    return <div>Error loading tests</div>;
  }

  const columns: Column<Test>[] = [
    {
      id: "id",
      name: "N°",
      selector: "id",
      align: "center",
    },
    {
      id: "ticketId",
      name: "Ticket ID",
      selector: "ticketId",
      align: "center",
    },
    {
      id: "result",
      name: "Resultado",
      selector: "result",
      align: "center",
    },
    {
      id: "date",
      name: "Fecha",
      align: "center",
      cell: (row) => <span>{new Date(row.date).toLocaleDateString()}</span>,
    },
    {
      id: "version",
      name: "Versión",
      selector: "version",
      align: "center",
    },
    {
      id: "observations",
      name: "Observaciones",
      selector: "observations",
    },
    {
      id: "testCase",
      name: "Caso de Prueba",
      cell: (row) => <span>{row.testCase.title}</span>,
    },
    {
      id: "actions",
      name: "",
      cell: (row) => (
        <IconButton
          variant="secondary"
          size="medium"
          onClick={() => deleteTest(row.id)}
        >
          <Trash size={20} />
        </IconButton>
      ),
    },
  ];

  return <Table data={tests} columns={columns} />;
};

export default Tests;
