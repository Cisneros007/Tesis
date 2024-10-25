import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-servicios-terrestre',
  templateUrl: './servicios-terrestre.component.html',
  styleUrls: ['./servicios-terrestre.component.css']
})
export class ServiciosTerrestreComponent implements OnInit {
  // Datos de ejemplo para los servicios terrestres
  servicios = [
    { nombre: 'Transporte Local', descripcion: 'Transporte dentro de la ciudad.', tarifa: 50 },
    { nombre: 'Transporte Nacional', descripcion: 'Transporte a nivel nacional.', tarifa: 150 },
  ];

  servicioSeleccionado: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setupToggleButtons();
  }

  // Método para ver los detalles de un servicio seleccionado
  verDetalles(servicio: any): void {
    this.servicioSeleccionado = servicio;
  }

  // Método para cerrar el detalle del servicio seleccionado
  cerrarDetalles(): void {
    this.servicioSeleccionado = null;
  }

  // Método para agregar un nuevo servicio
  agregarServicio(): void {
    console.log('Agregar Servicio');
  }

  // Implementación del método setupToggleButtons
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
