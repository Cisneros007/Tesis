import { Component, OnInit } from '@angular/core';
import { TrackingService } from 'src/app/services-cliente/tracking.service';
import { Tracking } from 'src/app/models-cliente/tracking.model'

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css'],
})
export class TrackingComponent implements OnInit {
  tracking: Tracking | null = null; // Objeto para un tracking específico
  codigo: string = ''; // Código ingresado por el usuario
  clave: string = ''; // Contraseña ingresada por el usuario
  errorMessage: string = ''; // Mensaje de error en caso de que no se encuentre el tracking

  constructor(private trackingService: TrackingService) {}

  ngOnInit(): void {}

  buscarTracking(): void {
    if (!this.codigo || !this.clave) {
      this.errorMessage = 'Por favor ingresa el código y la clave.';
      return;
    }

    this.trackingService.getTrackingByCodigoYClave(this.codigo, this.clave).subscribe({
      next: (data) => {
        this.tracking = data; // Asigna el tracking recibido
        this.errorMessage = ''; // Limpia el mensaje de error
        console.log('Tracking encontrado:', data);
      },
      error: (err) => {
        console.error('Error al buscar tracking:', err);
        this.tracking = null; // Limpia el tracking si ocurre un error
        this.errorMessage = 'No se encontró el tracking con ese código y clave.';
      },
    });
  }
}
