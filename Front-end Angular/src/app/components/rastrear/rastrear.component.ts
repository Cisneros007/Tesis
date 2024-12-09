import { Component } from '@angular/core';

@Component({
  selector: 'app-rastrear',
  templateUrl: './rastrear.component.html',
  styleUrls: ['./rastrear.component.css']
})
export class RastrearComponent {
  trackingDetails = {
    orderCode: '',
    password: ''
  };

  showTrackingInfo = false;
  origin: [number, number] = [-12.1167, -76.9967]; // Surco coordinates
  destination: [number, number] = [-12.2167, -76.9417]; // Villa El Salvador coordinates
  currentLocation: [number, number] = [0, 0];
  routeProgress = 0;
  animationInterval: any;

  informacionEnvio = {
    fechaRegistro: '2024-11-09',
    fechaEntrega: '2024-11-15',
    origen: 'Surco, Lima',
    destino: 'Villa El Salvador, Lima',
    estado: 'en-ruta',
    numeroRastreo: 'LIM-VES-001',
  };

  trackingInfo = {
    status: 'En tránsito',
    shippedDate: '2024-11-09',
    estimatedDelivery: '2024-11-15',
    currentLocation: 'Ruta entre Surco y Villa El Salvador',
  };

  // Enviar formulario
  onSubmit() {
    this.startTruckAnimation();
    this.showTrackingInfo = true;
  }

  // Iniciar animación del camión
  startTruckAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.routeProgress = 0;

    this.animationInterval = setInterval(() => {
      if (this.routeProgress >= 100) {
        clearInterval(this.animationInterval);
        return;
      }

      this.routeProgress += 0.5;
      this.updateTruckPosition();
    }, 100);
  }

  // Actualizar la posición del camión
  updateTruckPosition() {
    const lat = this.origin[0] + (this.destination[0] - this.origin[0]) * (this.routeProgress / 100);
    const lng = this.origin[1] + (this.destination[1] - this.origin[1]) * (this.routeProgress / 100);

    this.currentLocation = [lat, lng];
    this.updateLocationDescription();
  }

  // Actualizar la descripción de la ubicación
  updateLocationDescription() {
    if (this.routeProgress < 33) {
      this.trackingInfo.currentLocation = 'Saliendo de Surco';
    } else if (this.routeProgress < 66) {
      this.trackingInfo.currentLocation = 'Atravesando distritos de Lima';
    } else {
      this.trackingInfo.currentLocation = 'Entrando a Villa El Salvador';
    }
  }

  // Reiniciar rastreo
  resetTracking() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }

    this.showTrackingInfo = false;
    this.trackingDetails = { orderCode: '', password: '' };
    this.origin = [-12.1167, -76.9967];
    this.destination = [-12.2167, -76.9417];
    this.currentLocation = [0, 0];
    this.routeProgress = 0;
  }

  // Volver a inicio
  irAInicio() {
    this.resetTracking();
  }

  // Limpiar intervalo al destruir el componente
  ngOnDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}
