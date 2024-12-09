export interface Tracking {
codigo: any;
fechaHora: string|number|Date;
  idTracking?: number; // Opcional, porque se genera automáticamente
  idEncomienda: number; // ID de la encomienda asociada
  ubicacionActual: string; // Ubicación actual de la encomienda
  latitud: number; // Coordenada de latitud
  longitud: number; // Coordenada de longitud
  estado: 'recogido' | 'en tránsito' | 'en almacén' | 'entregado'; // Estado de la encomienda
  }