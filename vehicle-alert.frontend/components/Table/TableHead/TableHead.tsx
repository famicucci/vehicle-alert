import { TableHeadProps } from "./types";

export default function TableHead({ columns }: TableHeadProps<any>) {
  return (
    <thead className="bg-gray-400 text-white">
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            style={{
              width: `${column.minWidth}`,
            }}
            className="p-3"
          >
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
