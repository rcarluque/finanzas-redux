export interface IngresoEgreso {
  descripcion: string;
  cantidad: number;
  // tipo: true = Ingreso / false = Gasto
  tipo: boolean;
  uid?: string;
}

export interface IngresoEgresoState {
  items: IngresoEgreso[];
}