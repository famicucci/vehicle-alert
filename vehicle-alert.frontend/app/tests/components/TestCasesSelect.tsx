import { SearcheableSelect } from "@/components/SearchableSelect";
import useTestCase from "@/store/testCase/testCase";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";

const TestCasesSelect = ({ name, control }: { name: string; control: any }) => {
  const { testCases, fetchTestCases } = useTestCase();
  const [search, setSearch] = useState("");

  const {
    field,
    // fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    fetchTestCases("");
  }, []);

  return (
    <SearcheableSelect
      options={testCases.map((tc) => ({
        value: tc.id.toString(),
        label: tc.title,
      }))}
      value={field.value}
      searchValue={search}
      onClick={() => {
        field.onChange("");
        setSearch("");
      }}
      onChange={(e) => {
        setSearch(e.target.value);
        setTimeout(() => {
          fetchTestCases(e.target.value);
        }, 1500);
      }}
      onSelect={(value) => {
        field.onChange(value);
        setSearch("");
      }}
      onVisible={async () => {}}
      hasMore={false}
    />
  );
};

export default TestCasesSelect;
