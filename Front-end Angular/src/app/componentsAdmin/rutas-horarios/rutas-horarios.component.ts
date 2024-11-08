import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { RutasService } from 'src/app/services-admin/Rutas-Horarios-services/rutas.service';
import { EnviosService } from 'src/app/services-admin/Rutas-Horarios-services/envios.service';

@Component({
  selector: 'app-rutas-horarios',
  templateUrl: './rutas-horarios.component.html',
  styleUrls: ['./rutas-horarios.component.css']
})
export class RutasHorariosComponent implements OnInit {
  rutas: any[] = [];
  envios: any[] = [];
  rutaSeleccionada: any;
  envioSeleccionado: any; // Corregido para consistencia

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private rutasService: RutasService,
    private enviosService: EnviosService
  ) { }

  ngOnInit(): void {
    this.setupToggleButtons();
    this.loadRutas(); // Cargar las rutas al iniciar
    this.loadEnvios(); // Cargar los envíos al iniciar
  }

  loadRutas(): void {
    this.rutasService.getRutas().subscribe((data: any) => {
      this.rutas = data;
    });
  }

  loadEnvios(): void {
    this.enviosService.getEnvios().subscribe((data: any) => {
      this.envios = data;
    });
  }

  verDetallesRuta(ruta: any): void {
    this.rutaSeleccionada = ruta;
  }
  eliminarRuta(ruta:any): void{
    this.rutaSeleccionada=ruta;
    }
    eliminarEnvio(envio:any): void{
      this.envioSeleccionado= envio;
      }

  verDetallesEnvio(envio: any): void {
    this.envioSeleccionado = envio; // Corregido de enviosSeleccionado a envioSeleccionado
  }

  agregarRuta(): void {
    console.log('Agregar Ruta');
    // Lógica para agregar una nueva ruta
  }

  agregarEnvio(): void {
    console.log('Agregar Envío');
    // Lógica para agregar un nuevo envío
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
