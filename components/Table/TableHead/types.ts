import { Column } from "../types";

export interface TableHeadProps<T> {
  columns: Column<T>[];
}
