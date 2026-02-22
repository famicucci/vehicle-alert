import React from "react";
import { TableBodyProps } from "./types";
import { VisibleLogger } from "../VisibleLogger";

const TableBody = <T extends { id: string | number }>({
  data,
  columns,
  onVisible,
  hasMore,
}: TableBodyProps<T>) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td
              key={column.id}
              style={{
                textAlign: `${column.align}` as "left" | "right" | "center",
              }}
              className="py-2 px-2"
            >
              {column.cell
                ? column.cell(item)
                : (item[
                    column.selector as keyof typeof item
                  ] as React.ReactNode)}
            </td>
          ))}
        </tr>
      ))}
      {onVisible !== undefined && hasMore !== undefined && (
        <tr>
          <td className="py-2" colSpan={3}>
            <VisibleLogger
              onVisible={onVisible}
              data={data}
              hasMore={hasMore}
            />
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
