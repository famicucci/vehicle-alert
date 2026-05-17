import { formatPlate } from "./formatPlate";

interface Props {
  plate: string;
  className?: string;
}

export const PlateNumber = ({ plate, className }: Props) => (
  <span className={className}>{formatPlate(plate)}</span>
);
