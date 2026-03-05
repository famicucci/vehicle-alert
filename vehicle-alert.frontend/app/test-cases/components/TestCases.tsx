"use client";
import { useTestCases } from "@/store/testCase/testCase.query";

const TestCases = () => {
  const { data, isLoading, error } = useTestCases("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading test cases</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((vehicle) => (
        <div key={vehicle.id} className="flex gap-2 items-center">
          <div className="flex-grow">
            {vehicle.brand.name} {vehicle.color.name}
          </div>
          <div className="font-bold">{vehicle.plateNumber}</div>
        </div>
      ))}
    </div>
  );
};

export default TestCases;
