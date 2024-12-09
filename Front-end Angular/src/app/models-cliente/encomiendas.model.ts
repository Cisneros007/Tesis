export interface Encomienda {
    idEncomienda: number; // Identificador único de la encomienda
    remitenteNombre: string; // Nombre del remitente
    remitenteTelefono?: string; // Teléfono del remitente (opcional)
    destinatarioNombre: string; // Nombre del destinatario
    destinatarioTelefono?: string; // Teléfono del destinatario (opcional)
    paqueteDescripcion?: string; // Descripción del paquete (opcional)
    paquetePeso?: number; // Peso del paquete en kilogramos (opcional)
    paqueteValor?: number; // Valor monetario del paquete (opcional)
    servicioDomicilio: boolean; // Indica si se requiere servicio a domicilio
    costoServicioDomicilio?: number; // Costo del servicio a domicilio (opcional)
    fechaCreacion: Date; // Fecha de creación de la encomienda
   
  }