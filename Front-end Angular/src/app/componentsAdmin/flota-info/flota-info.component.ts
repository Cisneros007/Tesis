import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-flota-info',
  templateUrl: './flota-info.component.html',
  styleUrls: ['./flota-info.component.css']
})
export class FlotaInfoComponent implements AfterViewInit {
  // Array que contiene información sobre la flota de vehículos
  fleetInfo = [
    {
      nombre: 'Camión 1',
      marca: 'Volvo',
      modelo: 'FH16',
      anio: 2020,
      capacidadCarga: 5000,
      caracteristicas: ['Refrigeración', 'GPS', 'Acceso a zonas urbanas'],
      estado: 'Operativo',
      fechaRevision: '2024-05-15',
      imagen: 'camion1.jpg'
    },
    {
      nombre: 'Camión 2',
      marca: 'Mercedes-Benz',
      modelo: 'Actros',
      anio: 2019,
      capacidadCarga: 7000,
      caracteristicas: ['Caja cerrada', 'GPS', 'Seguro de carga'],
      estado: 'Operativo',
      fechaRevision: '2024-06-01',
      imagen: 'camion2.jpg'
    },
    // Agregar más vehículos si es necesario
  ];

  // Variable para almacenar el vehículo seleccionado
  vehiculoSeleccionado: any = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupToggleButtons();
  }

  // Función que se ejecuta al seleccionar un vehículo para ver más detalles
  verDetalles(vehiculo: any): void {
    this.vehiculoSeleccionado = vehiculo;
  }

  // Función que se ejecuta al cerrar los detalles del vehículo seleccionado
  cerrarDetalles(): void {
    this.vehiculoSeleccionado = null;
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
