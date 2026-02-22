import React, { useRef, useEffect } from "react";
import { DropdownProps } from "./types";

const Dropdown = ({
  isOpen,
  onClose,
  children,
  position,
  positionAbove = false,
}: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen || !position) return null;

  const style: React.CSSProperties = {
    left: position.left,
    width: position.width,
  };

  if (positionAbove && position.bottom !== undefined) {
    style.bottom = position.bottom;
  } else {
    style.top = position.top;
  }

  return (
    <div
      className="fixed left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md z-[99999] max-h-[300px] overflow-y-auto"
      ref={containerRef}
      style={style}
    >
      {children}
    </div>
  );
};

export default Dropdown;
