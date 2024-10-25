import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {
  // Información de la empresa
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

  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupToggleButtons();
  }

  verDetallesProyecto(proyecto: any): void {
    alert(`Detalles del proyecto: ${proyecto.nombre}\nDescripción: ${proyecto.descripcion}`);
  }

  viewDetails(tarifa: any): void {
    // Redirige a la página de detalles de la tarifa
    this.router.navigate(['/tarifa-detalle', tarifa.id]);
  }

  private setupToggleButtons(): void {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
    const toggleButtons = sidebar.querySelectorAll('.toggle-submenu');

    const closeAllSubmenus = () => {
      sidebar.querySelectorAll('.submenu').forEach((submenu: HTMLElement) => {
        this.renderer.setStyle(submenu, 'display', 'none');
      });
      toggleButtons.forEach((button: HTMLElement) => {
        this.renderer.removeClass(button, 'active');
      });
    };

    toggleButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (e: Event) => {
        e.preventDefault();
        const submenu = button.nextElementSibling as HTMLElement;

        if (submenu.style.display === 'block') {
          this.renderer.setStyle(submenu, 'display', 'none');
          this.renderer.removeClass(button, 'active');
        } else {
          closeAllSubmenus();
          this.renderer.setStyle(submenu, 'display', 'block');
          this.renderer.addClass(button, 'active');
        }
      });
    });

    this.renderer.listen('document', 'click', (e: Event) => {
      if (!sidebar.contains(e.target as Node)) {
        closeAllSubmenus();
      }
    });
  }
}
