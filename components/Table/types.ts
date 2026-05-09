import React from "react";

// el row tiene que ser generico de acuerdo al objeto que llegue, esto dependera de los columns. El selector es el que determinan los datos que llegan
export type Row<T> = T;

export type Align = "left" | "center" | "right";

export interface Column<T> {
  id: string;
  name: string;
  selector?: string; // Selector vinculado a las claves de Row
  minWidth?: string;
  align?: Align;
  cell?: (row: T) => React.ReactElement; // Callback para renderizar el contenido dinámico
}

export interface TableProps<T> {
  data: T[]; // Cada fila tiene la estructura definida por el genérico T
  columns: Column<T>[]; // Columnas relacionadas con las filas
  onVisible?: () => Promise<void>;
  hasMore?: boolean;
}
