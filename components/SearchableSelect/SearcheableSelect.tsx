import { useRef, useState } from "react";
import { SearchableSelectProps } from "./types";
import { InputView } from "../Input";
import { VisibleLogger } from "../VisibleLogger";
import { Dropdown, useDropdownPosition } from "../Dropdown";

function SearchableSelect({
  options,
  onChange,
  onVisible,
  hasMore,
  onSelect,
  value,
  searchValue,
  onClick,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { dropdownRect, dropdownAnchorRef, positionAbove } =
    useDropdownPosition(isOpen);

  const handleInputClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full" ref={dropdownAnchorRef}>
      <div onClick={handleInputClick}>
        <InputView
          placeholder="ID del Caso de Prueba"
          value={
            searchValue || options.find((o) => o.value === value)?.label || ""
          }
          onChange={onChange}
          onClick={onClick}
        />
      </div>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={dropdownRect}
        positionAbove={positionAbove}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            onClick={() => {
              onSelect(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
        <VisibleLogger onVisible={onVisible} data={options} hasMore={hasMore} />
      </Dropdown>
    </div>
  );
}

export default SearchableSelect;
