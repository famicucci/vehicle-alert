import React, { useEffect, useRef, useState } from "react";

const useDropdownPosition = (isOpen: boolean) => {
  const dropdownAnchorRef = useRef<HTMLDivElement>(null);
  const [dropdownRect, setDropdownRect] = useState<{
    left: number;
    top: number;
    bottom?: number;
    width: number;
  }>();
  const [positionAbove, setPositionAbove] = useState(false);

  useEffect(() => {
    if (isOpen && dropdownAnchorRef.current) {
      const rect = dropdownAnchorRef.current.getBoundingClientRect();
      const dropdownHeight = 300; // Approximate max dropdown height
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // Position above if not enough space below
      const shouldPositionAbove =
        spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

      setPositionAbove(shouldPositionAbove);

      if (shouldPositionAbove) {
        setDropdownRect({
          left: rect.left,
          top: 0, // Not used when positioned above
          bottom: window.innerHeight - rect.top,
          width: rect.width,
        });
      } else {
        setDropdownRect({
          left: rect.left,
          top: rect.bottom,
          width: rect.width,
        });
      }
    }
  }, [isOpen]);

  return {
    dropdownRect,
    dropdownAnchorRef,
    positionAbove,
  };
};

export default useDropdownPosition;
