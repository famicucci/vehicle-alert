"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import useTest from "@/store/test/test";
import { useForm } from "react-hook-form";
import TestCasesSelect from "./TestCasesSelect";

const TestForm = ({ onSubmit: onAfterSubmit }: { onSubmit?: () => void }) => {
  const { createTest } = useTest();

  const defaultValues = {
    ticketId: "",
    qaStatus: "",
    date: new Date().toISOString().slice(0, 16),
    version: "",
    observations: "",
    testCaseId: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const onSubmit = async (data: any) => {
    await createTest({
      ticketId: data.ticketId,
      result: data.qaStatus,
      date: data.date,
      version: data.version,
      observations: data.observations,
      testCaseId: parseInt(data.testCaseId, 10),
    });

    reset();

    onAfterSubmit && onAfterSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-stretch gap-4 min-w-[500px]"
    >
      <Input name="ticketId" control={control} placeholder="Ticket ID" />
      <Input
        name="date"
        control={control}
        placeholder="Fecha"
        type="datetime-local"
      />
      <Input name="version" control={control} placeholder="Versión" />
      <Select
        name="qaStatus"
        control={control}
        placeholder="Estado QA"
        options={[
          { value: "Passed", label: "Aprobado" },
          { value: "Failed", label: "Fallido" },
          { value: "Pending", label: "Pendiente" },
        ]}
      />
      <Input
        name="observations"
        control={control}
        placeholder="Observaciones"
      />
      <TestCasesSelect name="testCaseId" control={control} />
      <Button type="submit" variant="primary" className="mt-2">
        Crear
      </Button>
    </form>
  );
};

export default TestForm;
