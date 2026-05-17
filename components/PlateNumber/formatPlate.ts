const FORMATS = [
  { regex: /^([A-Z]{2})(\d{3})([A-Z]{2})$/, template: "$1 $2 $3" }, // AB 123 CD
  { regex: /^([A-Z]{3})(\d{3})$/,            template: "$1 $2"     }, // ABC 123
  { regex: /^([A-Z]\d{2})(\d[A-Z]{3})$/,     template: "$1 $2"     }, // A12 3BCD
  { regex: /^(\d{3})([A-Z]{3})$/,            template: "$1 $2"     }, // 123 ABC
];

export const formatPlate = (plate: string): string => {
  const match = FORMATS.find(({ regex }) => regex.test(plate));
  return match ? plate.replace(match.regex, match.template) : plate;
};
