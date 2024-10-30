import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})
export class HistorialClienteComponent {
  historialEnvios = [
    {
      nombreEnvio: 'Envío #1',
      fechaEnvio: '2024-09-01',
      horaEnvio: '10:00',
      estado: 'Completado',
      descripcion: 'Envío completado sin problemas.'
    },
    {
      nombreEnvio: 'Envío #2',
      fechaEnvio: '2024-09-02',
      horaEnvio: '14:30',
      estado: 'En Progreso',
      descripcion: 'Envío en tránsito.'
    },
    {
      nombreEnvio: 'Envío #3',
      fechaEnvio: '2024-09-03',
      horaEnvio: '09:15',
      estado: 'Pendiente',
      descripcion: 'Envío programado, pendiente de salida.'
    }
  ];

  envioSeleccionado: any = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    this.setupToggleButtons();
  }

  // Ver detalles del envío
  verDetallesEnvio(envio: any) {
    this.envioSeleccionado = envio;
  }

  // Cerrar detalles del envío
  cerrarDetalles() {
    this.envioSeleccionado = null;
  }

  // Función para configurar los botones de alternancia en el menú
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
