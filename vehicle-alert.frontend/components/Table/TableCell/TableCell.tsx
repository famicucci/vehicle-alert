import React from "react";
import { TableCellProps } from "./types";

const TableCell = ({ children, className = "", ...props }: TableCellProps) => (
  <td
    className={`px-2 py-1 text-sm border-b border-gray-200 ${className}`}
    {...props}
  >
    {children}
  </td>
);

export default TableCell;
