"use client";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import useTestCase from "@/store/testCase/testCase";
import { useForm } from "react-hook-form";

const SelectProductsSearchForm = ({
  onSubmit: onAfterSubmit,
}: {
  onSubmit?: () => void;
}) => {
  const { createTestCase } = useTestCase();

  const defaultValues = {
    section: "",
    title: "",
    steps: "",
    testData: "",
    expectedResult: "",
    platform: "",
    priority: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    // resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    await createTestCase({
      section: data.section,
      title: data.title,
      steps: data.steps,
      testData: data.testData,
      expectedResult: data.expectedResult,
      platform: data.platform,
      priority: data.priority,
    });

    reset();

    onAfterSubmit && onAfterSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-stretch gap-4 min-w-[500px]"
    >
      <Input name="title" control={control} placeholder="Titulo" />
      <Input name="steps" control={control} placeholder="Pasos" />
      <Input name="testData" control={control} placeholder="Datos de prueba" />
      <Input name="section" control={control} placeholder="Sección" />
      <Input
        name="expectedResult"
        control={control}
        placeholder="Resultado esperado"
      />
      <Select
        name="platform"
        control={control}
        placeholder="Plataforma"
        options={[
          { value: "Web", label: "Web" },
          { value: "Mobile", label: "Mobile" },
        ]}
      />
      <Select
        name="priority"
        control={control}
        placeholder="Prioridad"
        options={[
          { value: "Baja", label: "Baja" },
          { value: "Media", label: "Media" },
          { value: "Alta", label: "Alta" },
        ]}
      />
      <Button type="submit" variant="primary" className="mt-2">
        Crear
      </Button>
    </form>
  );
};

export default SelectProductsSearchForm;
