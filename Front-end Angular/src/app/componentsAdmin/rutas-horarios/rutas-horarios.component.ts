import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-rutas-horarios',
  templateUrl: './rutas-horarios.component.html',
  styleUrls: ['./rutas-horarios.component.css']
})
export class RutasHorariosComponent implements OnInit {
  rutas = [
    { nombreRuta: 'Ruta A', horaSalida: '08:00 AM', horaLlegada: '10:00 AM', duracion: '2h' },
    { nombreRuta: 'Ruta B', horaSalida: '11:00 AM', horaLlegada: '01:00 PM', duracion: '2h' },
    { nombreRuta: 'Ruta C', horaSalida: '02:00 PM', horaLlegada: '04:00 PM', duracion: '2h' }
  ];

  envios = [
    { nombreEnvio: 'Envío 1', fechaEnvio: '2024-09-20', horaEnvio: '08:30 AM', estado: 'En tránsito' },
    { nombreEnvio: 'Envío 2', fechaEnvio: '2024-09-21', horaEnvio: '11:00 AM', estado: 'Entregado' },
    { nombreEnvio: 'Envío 3', fechaEnvio: '2024-09-22', horaEnvio: '02:15 PM', estado: 'En espera' }
  ];

  rutaSeleccionada: any;
  envioSeleccionado: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.setupToggleButtons();
  }

  verDetallesRuta(ruta: any): void {
    this.rutaSeleccionada = ruta;
  }

  verDetallesEnvio(envio: any): void {
    this.envioSeleccionado = envio;
  }

  agregarRuta(): void {
    console.log('Agregar Ruta');
  }

  agregarEnvio(): void {
    console.log('Agregar Envío');
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
