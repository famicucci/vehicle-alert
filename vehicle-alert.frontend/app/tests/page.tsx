"use client";
import Tests from "./components/Tests";
import TestForm from "./components/TestForm";
import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/Button";
import { Typography } from "@/components/Typography";
import { ModalContent } from "@/components/Modal/ModalContent";
import { InputView } from "@/components/Input";
import useTest from "@/store/test/test";
import Menu from "@/components/Menu/Menu";

const Page = () => {
  const { show, hide } = useModal();
  const { setSearch } = useTest();

  return (
    <div>
      <div className="flex items-center justify-between py-2 px-2">
        <div className="flex items-center justify-start">
          <Menu />
          {/* <Typography variant="h3" className="mr-2">
            Tests
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
              show("Crear un Test", () => (
                <ModalContent>
                  <TestForm onSubmit={() => hide()} />
                </ModalContent>
              ))
            }
          >
            Crear Test
          </Button>
        </div>
      </div>
      <Tests />
    </div>
  );
};

export default Page;
