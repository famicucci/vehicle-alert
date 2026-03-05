"use client";
import { useTestCases } from "@/store/testCase/testCase.query";

const TestCases = () => {
  const { data, isLoading, error } = useTestCases("");
  console.log("test cases", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading test cases</div>;
  }

  return (
    <>
      {data?.map((vehicle) => (
        <div key={vehicle.id}>
          {vehicle.brand.name} {vehicle.color.name} {vehicle.plateNumber}
        </div>
      ))}
    </>
  );
};

export default TestCases;
