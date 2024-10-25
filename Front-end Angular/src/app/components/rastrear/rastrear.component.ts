import { Component, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';

interface InformacionEnvio {
  numeroRastreo: string;
  fechaRegistro: string;
  fechaEntrega: string;
  origen: string;
  destino: string;
  estado: 'registrado' | 'en-ruta' | 'entregado';
}

@Component({
  selector: 'app-rastrear',
  templateUrl: './rastrear.component.html',
  styleUrls: ['./rastrear.component.css']
})
export class RastrearComponent implements OnInit, AfterViewInit {
  trackingDetails = {
    trackingNumber: '',
    orderCode: '',
    password: ''
  };

  trackingInfo: any;

  informacionEnvio: InformacionEnvio = {
    numeroRastreo: '',
    fechaRegistro: '',
    fechaEntrega: '',
    origen: '',
    destino: '',
    estado: 'registrado'
  };

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupToggleButtons();
  }

  onSubmit() {
    console.log('Buscando información con los siguientes datos:', this.trackingDetails);

    // Simulación de datos de rastreo
    this.trackingInfo = {
      status: 'En tránsito',
      shippedDate: '2024-09-10',
      estimatedDelivery: '2024-09-15',
      currentLocation: 'Lima, Perú'
    };

    // Actualizar informacionEnvio con los datos obtenidos
    this.informacionEnvio = {
      numeroRastreo: this.trackingDetails.trackingNumber,
      fechaRegistro: this.trackingInfo.shippedDate,
      fechaEntrega: this.trackingInfo.estimatedDelivery,
      origen: 'LIMA',
      destino: this.trackingInfo.currentLocation,
      estado: 'en-ruta'
    };
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