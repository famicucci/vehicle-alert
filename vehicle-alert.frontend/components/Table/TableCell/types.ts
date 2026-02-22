export interface TableCellProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}
