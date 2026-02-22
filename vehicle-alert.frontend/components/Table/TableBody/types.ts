import { Column } from "../types";

export interface TableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  onVisible?: () => Promise<void>;
  hasMore?: boolean;
}
