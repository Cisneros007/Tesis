import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envio-crear',
  templateUrl: './envio-crear.component.html',
  styleUrls: ['./envio-crear.component.css']
})
export class EnvioCrearComponent {
finalizeEnvio() {
throw new Error('Method not implemented.');
}
  // Form Data
  remitenteNombre = '';
  remitenteTelefono = '';
  remitenteDireccion = '';
  destinatarioNombre = '';
  destinatarioTelefono = '';
  destinatarioDireccion = '';
  paqueteDescripcion = '';
  paquetePeso = 0;
  paqueteValor = 0;
  servicioDomicilio = 'no';
  costoServicioDomicilio = 0;

  // Component State
  currentStep = 1;
  stepsCompleted = [false, false, false, false];
  showReceipt = false;
  trackingCode = '';
  password = '';
  today = new Date();
  
  distritos = [
    'Miraflores', 'San Isidro', 'Surco', 'Lima Centro', 'Barranco', 'Callao', 
    'San Borja', 'San Miguel', 'La Molina', 'Chorrillos', 'Villa El Salvador', 
    'La Victoria', 'Ate', 'Comas', 'San Juan de Lurigancho'
  ];

  constructor(private router: Router) {}

  generateTrackingCode(): string {
    return 'ENV' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  generatePassword(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  nextStep() {
    if (this.currentStep < 4 && this.isStepValid()) {
      this.stepsCompleted[this.currentStep - 1] = true;
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.remitenteNombre.trim() !== '' &&
               this.remitenteTelefono.trim() !== '' &&
               this.remitenteDireccion.trim() !== '';
      case 2:
        return this.destinatarioNombre.trim() !== '' &&
               this.destinatarioTelefono.trim() !== '' &&
               this.destinatarioDireccion.trim() !== '';
      case 3:
        return this.paqueteDescripcion.trim() !== '' &&
               this.paquetePeso > 0 &&
               this.paqueteValor > 0;
      default:
        return true;
    }
  }

  onSubmit() {
    if (this.isStepValid()) {
      this.trackingCode = this.generateTrackingCode();
      this.password = this.generatePassword();
      this.today = new Date();
      this.showReceipt = true;
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  imprimirBoleta() {
    window.print();
  }

  calcularTotal(): number {
    return this.servicioDomicilio === 'si' 
      ? this.paqueteValor + this.costoServicioDomicilio 
      : this.paqueteValor;
  }
}