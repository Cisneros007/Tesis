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
  origin: [number, number] = [0, 0];
  destination: [number, number] = [0, 0];
  currentLocation: [number, number] = [0, 0];
  routeProgress = 0;
  animationInterval: any;
  
  informacionEnvio = {
    fechaRegistro: '2024-11-09',
    fechaEntrega: '2024-11-15',
    origen: 'Lima, Perú',
    destino: 'Cusco, Perú',
    estado: 'en-ruta',
    numeroRastreo: 'ABC123',
  };
  
  trackingInfo = {
    status: 'En tránsito',
    shippedDate: '2024-11-09',
    estimatedDelivery: '2024-11-15',
    currentLocation: 'En ruta de Lima a Cusco',
  };

  onSubmit() {
    // Coordenadas reales de origen y destino en Perú
    this.origin = [-12.0464, -77.0428]; // Lima
    this.destination = [-13.5319, -71.9675]; // Cusco
    
    // Iniciar la animación del camión
    this.startTruckAnimation();
    
    // Mostrar la información de rastreo
    this.showTrackingInfo = true;
  }

  startTruckAnimation() {
    // Limpiar cualquier intervalo existente
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    
    this.routeProgress = 0;
    
    // Actualizar la posición del camión cada 100ms
    this.animationInterval = setInterval(() => {
      if (this.routeProgress >= 100) {
        clearInterval(this.animationInterval);
        return;
      }
      
      this.routeProgress += 0.5;
      this.updateTruckPosition();
    }, 100);
  }

  updateTruckPosition() {
    // Calcular la posición interpolada del camión entre origen y destino
    const lat = this.origin[0] + (this.destination[0] - this.origin[0]) * (this.routeProgress / 100);
    const lng = this.origin[1] + (this.destination[1] - this.origin[1]) * (this.routeProgress / 100);
    
    this.currentLocation = [lat, lng];
    
    // Actualizar la descripción de la ubicación actual
    this.updateLocationDescription();
  }

  updateLocationDescription() {
    if (this.routeProgress < 33) {
      this.trackingInfo.currentLocation = 'Saliendo de Lima';
    } else if (this.routeProgress < 66) {
      this.trackingInfo.currentLocation = 'En ruta por la sierra central';
    } else {
      this.trackingInfo.currentLocation = 'Aproximándose a Cusco';
    }
  }

  resetTracking() {
    // Detener la animación
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
    
    this.showTrackingInfo = false;
    this.trackingDetails = { orderCode: '', password: '' };
    this.origin = [0, 0];
    this.destination = [0, 0];
    this.currentLocation = [0, 0];
    this.routeProgress = 0;
  }

  irAInicio() {
    // Implementar la redirección a la página de inicio
    this.resetTracking();
  }

  ngOnDestroy() {
    // Limpiar el intervalo cuando el componente se destruye
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }
}