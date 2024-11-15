// src/app/models/tracking.model.ts
export interface Tracking {
  idTracking: number;
  idEncomienda: number;
  ubicacionActual: string;
  latitud: number;
  longitud: number;
  fechaHora: string;
  estado: 'recogido' | 'en tránsito' | 'en almacén' | 'entregado';
  codigo: string;      // Add the 'codigo' field
  contraseña: string;  // Add the 'contraseña' field
}
