import { Component, OnInit } from '@angular/core';

interface TransportService {
  id?: number;
  nombre: string;
  descripcion: string;
  tipo: 'terrestre' | 'aereo';
  capacidad?: string;
  tarifaBase?: number;
  iconClass?: string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  serviciosTerrestres: TransportService[] = [
    {
      id: 1,
      nombre: 'Transporte Terrestre Local',
      descripcion: 'Servicio de transporte terrestre dentro de la ciudad.',
      tipo: 'terrestre',
      capacidad: 'Hasta 2 toneladas',
      iconClass: 'text-blue-600'
    },
    {
      id: 2,
      nombre: 'Transporte Terrestre Nacional',
      descripcion: 'Servicio de transporte terrestre entre ciudades del país.',
      tipo: 'terrestre',
      capacidad: 'Hasta 10 toneladas',
      iconClass: 'text-blue-600'
    },
    {
      id: 3,
      nombre: 'Transporte de Carga Pesada',
      descripcion: 'Transporte de cargas de gran volumen y peso.',
      tipo: 'terrestre',
      capacidad: 'Más de 10 toneladas',
      iconClass: 'text-blue-600'
    }
  ];

  serviciosAereos: TransportService[] = [
    {
      id: 4,
      nombre: 'Envío Aéreo Nacional',
      descripcion: 'Transporte aéreo dentro del país para envíos rápidos.',
      tipo: 'aereo',
      tarifaBase: 500,
      iconClass: 'text-green-600'
    },
    {
      id: 5,
      nombre: 'Envío Aéreo Internacional',
      descripcion: 'Servicio de envío aéreo a nivel internacional.',
      tipo: 'aereo',
      tarifaBase: 1200,
      iconClass: 'text-green-600'
    },
    {
      id: 6,
      nombre: 'Transporte Aéreo de Carga',
      descripcion: 'Servicio especializado para transporte aéreo de mercancías.',
      tipo: 'aereo',
      tarifaBase: 800,
      iconClass: 'text-green-600'
    }
  ];

  servicioSeleccionadoTerrestre: TransportService | null = null;
  servicioSeleccionadoAereo: TransportService | null = null;

  ngOnInit(): void {}

  verDetallesTerrestre(servicio: TransportService): void {
    this.servicioSeleccionadoTerrestre = servicio;
  }

  verDetallesAereo(servicio: TransportService): void {
    this.servicioSeleccionadoAereo = servicio;
  }

  cerrarDetalles(): void {
    this.servicioSeleccionadoTerrestre = null;
    this.servicioSeleccionadoAereo = null;
  }
}
