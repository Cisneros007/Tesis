import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ServiciosAereosService } from 'src/app/services-admin/servicios-transporte/servicios-aereos.service';
import { ServiciosTerrestresService } from 'src/app/services-admin/servicios-transporte/servicios-terrestres.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit, AfterViewInit { // Agregar AfterViewInit aquí
  serviciosTerrestres: any[] = [];
  serviciosAereos: any[] = [];
  
  servicioSeleccionadoTerrestre: any = null;
  servicioSeleccionadoAereo: any = null;

  constructor(
    private serviciosTerrestresService: ServiciosTerrestresService,
    private serviciosAereosService: ServiciosAereosService, // Agregar coma aquí
    private elRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.cargarServiciosTerrestres();
    this.cargarServiciosAereos();
  }

  cargarServiciosTerrestres(): void {
    this.serviciosTerrestresService.obtenerServicios().subscribe(
      (servicios) => {
        this.serviciosTerrestres = servicios;
      },
      (error) => {
        console.error('Error al cargar servicios terrestres:', error);
      }
    );
  }

  cargarServiciosAereos(): void {
    this.serviciosAereosService.obtenerServicios().subscribe(
      (servicios) => {
        this.serviciosAereos = servicios;
      },
      (error) => {
        console.error('Error al cargar servicios aéreos:', error);
      }
    );
  }

  verDetallesTerrestre(servicio: any): void {
    this.servicioSeleccionadoTerrestre = servicio;
    this.servicioSeleccionadoAereo = null; // Cierra los detalles aéreos si están abiertos
  }

  verDetallesAereo(servicio: any): void {
    this.servicioSeleccionadoAereo = servicio;
    this.servicioSeleccionadoTerrestre = null; // Cierra los detalles terrestres si están abiertos
  }

  cerrarDetalles(): void {
    this.servicioSeleccionadoTerrestre = null;
    this.servicioSeleccionadoAereo = null;
  }

  agregarServicio(): void {
    console.log('Agregar servicio');
    // Aquí puedes implementar la lógica para agregar un nuevo servicio.
  }

  ngAfterViewInit(): void {
    this.setupToggleButtons();
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
