export type Agrupacion = {
  id: number;
  nombre: string;
  activa: boolean;
};

export type Hermano = {
  id: number;
  nombreCompleto: string;
  puesto?: string | null;
  activo: boolean;
  membresias?: { agrupacion: Agrupacion }[];
};

export type Actividad = {
  id: number;
  nombre: string;
  fechaHora: string;
  abierta: boolean;
};
