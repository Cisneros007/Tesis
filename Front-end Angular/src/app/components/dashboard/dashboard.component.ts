import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  empresa = {
    nombre: 'Tech Solutions S.A.',
    descripcion: 'Una empresa líder en el desarrollo de software y soluciones tecnológicas.',
    direccion: 'Av. Principal 123, Lima, Perú',
    telefono: '+51 987 654 321',
    email: 'contacto@techsolutions.com',
    fechaFundacion: new Date('2010-06-15'),
    valores: ['Innovación', 'Compromiso', 'Calidad', 'Responsabilidad Social'],
    proyectos: [
      {
        nombre: 'Sistema de Gestión de Inventarios',
        descripcion: 'Desarrollo de un sistema integral para la gestión de inventarios de empresas.',
        estado: 'Completado'
      },
      {
        nombre: 'Aplicación Móvil de Servicios',
        descripcion: 'Aplicación que permite a los usuarios solicitar servicios a través de sus dispositivos móviles.',
        estado: 'En Desarrollo'
      },
      {
        nombre: 'Plataforma de E-learning',
        descripcion: 'Desarrollo de una plataforma para cursos en línea y educación a distancia.',
        estado: 'Completado'
      }
    ],
    testimonios: [
      {
        texto: 'Tech Solutions ha transformado nuestra forma de trabajar, su software es excepcional.',
        autor: 'Juan Pérez, CEO de Empresa XYZ'
      },
      {
        texto: 'Estamos muy satisfechos con el servicio y soporte técnico.',
        autor: 'María López, Gerente de Operaciones de Empresa ABC'
      }
    ],
    ubicacion: {
      lat: -12.046374,
      lng: -77.042793
    }
  };

  buscarRealizado = false;

  constructor(
    private elRef: ElementRef, 
    private renderer: Renderer2, 
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // Aquí puedes agregar la configuración inicial para la vista después de cargar el componente
  }

  buscarTarifas(): void {
    // Implementa la lógica para buscar tarifas reales
    this.buscarRealizado = true;
  }

  viewDetails(tarifa: any): void {
    // Redirige a la página de detalles de la tarifa
    this.router.navigate(['/tarifa-detalle', tarifa.id]);
  }
}
