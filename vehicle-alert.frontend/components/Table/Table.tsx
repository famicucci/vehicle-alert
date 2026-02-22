import React from "react";
import { TableHead } from "./TableHead";
import { TableProps } from "./types";
import { TableBody } from "./TableBody";

const Table = <T extends { id: string | number }>({
  data,
  columns,
  onVisible,
  hasMore,
}: TableProps<T>) => {
  return (
    <table className="table-auto border-collapse w-full rounded">
      <TableHead columns={columns} />
      <TableBody
        data={data}
        columns={columns}
        onVisible={onVisible}
        hasMore={hasMore}
      />
    </table>
  );
};

export default Table;
