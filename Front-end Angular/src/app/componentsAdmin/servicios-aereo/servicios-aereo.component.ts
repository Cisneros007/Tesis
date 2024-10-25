import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicios-aereo',
  templateUrl: './servicios-aereo.component.html',
  styleUrls: ['./servicios-aereo.component.css']
})
export class ServiciosAereoComponent implements OnInit {
  // Lista de servicios aéreos
  serviciosAereos = [
    {
      nombre: 'Envío Exprés Aéreo',
      descripcion: 'Servicio de envío rápido con prioridad en entregas.',
      tarifa: 120.00
    },
    {
      nombre: 'Envío Estándar Aéreo',
      descripcion: 'Entrega estándar con tiempos moderados.',
      tarifa: 80.00
    },
    {
      nombre: 'Envío Económico Aéreo',
      descripcion: 'Servicio de bajo costo para cargas más grandes.',
      tarifa: 50.00
    }
  ];

  // Servicio seleccionado para mostrar detalles
  servicioSeleccionado: any = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setupToggleButtons();
  }

  // Método para ver los detalles de un servicio
  verDetalles(servicio: any) {
    this.servicioSeleccionado = servicio;
  }

  // Método para cerrar los detalles del servicio seleccionado
  cerrarDetalles() {
    this.servicioSeleccionado = null;
  }

  // Método para agregar un nuevo servicio (funcionalidad a implementar)
  agregarServicio() {
    console.log('Agregar servicio aéreo');
    // Aquí puedes implementar la lógica para agregar un nuevo servicio aéreo.
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
