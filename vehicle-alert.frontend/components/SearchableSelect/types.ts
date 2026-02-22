import { ChangeEvent } from "react";

export interface SearchableSelectProps {
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onVisible: () => Promise<void>;
  hasMore: boolean;
  onSelect: (customerId: string) => void;
  value: string;
  searchValue: string;
  onClick?: () => void;
}
