import { Component } from '@angular/core';

@Component({
  selector: 'app-rastrear',
  templateUrl: './rastrear.component.html',
  styleUrls: ['./rastrear.component.css']
})
export class RastrearComponent {
  trackingDetails = { orderCode: '', password: '' };
  trackingInfo: any;
  informacionEnvio: any;
  showTrackingInfo: boolean = false; // Variable para controlar la visibilidad del formulario

  onSubmit() {
    // Simulación de la llamada a un servicio para obtener información del envío
    const mockTrackingData = {
      status: 'En ruta',
      shippedDate: '2024-11-01',
      estimatedDelivery: '2024-11-05',
      currentLocation: 'Lima, Perú',
      fechaRegistro: '2024-11-01',
      fechaEntrega: '2024-11-05',
      origen: 'Lima, Perú',
      destino: 'Arequipa, Perú',
      numeroRastreo: 'ABC123456'
    };

    // Actualizar el estado de trackingInfo e informacionEnvio
    this.trackingInfo = mockTrackingData;
    this.informacionEnvio = {
      fechaRegistro: mockTrackingData.fechaRegistro,
      fechaEntrega: mockTrackingData.fechaEntrega,
      origen: mockTrackingData.origen,
      destino: mockTrackingData.destino,
      numeroRastreo: mockTrackingData.numeroRastreo,
      estado: mockTrackingData.status
    };

    this.showTrackingInfo = true; // Mostrar la información del rastreo
  }

  irAInicio() {
    console.log('Ir a la página de inicio');
    // Aquí podrías usar el Router de Angular para navegar
    // Ejemplo: this.router.navigate(['/home']);
  }

  resetTracking() {
    this.trackingDetails = { orderCode: '', password: '' };
    this.trackingInfo = null;
    this.informacionEnvio = null;
    this.showTrackingInfo = false; // Ocultar el formulario nuevamente
  }
}
