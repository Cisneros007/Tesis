import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-dashboard',
  templateUrl: './empleado-dashboard.component.html',
  styleUrls: ['./empleado-dashboard.component.css']
})
export class EmpleadoDashboardComponent implements OnInit {
  encomiendaForm: FormGroup;
  currentStep = 1;
  stepsCompleted = [false, false, false, false]; // To track which steps are completed
  trackingCode = '';
  password = '';
  showReceipt = false;
  today = new Date();

  constructor(private fb: FormBuilder, private router: Router) {
    this.encomiendaForm = this.fb.group({
      remitenteNombre: ['', Validators.required],
      remitenteTelefono: ['', Validators.required],
      remitenteDireccion: ['', Validators.required],
      destinatarioNombre: ['', Validators.required],
      destinatarioTelefono: ['', Validators.required],
      destinatarioDireccion: ['', Validators.required],
      paqueteDescripcion: ['', Validators.required],
      paquetePeso: ['', Validators.required],
      paqueteValor: ['', Validators.required],
      servicioDomicilio: ['', Validators.required],
      costoServicioDomicilio: ['']
    });
  }

  ngOnInit(): void {}

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
    const controls = this.encomiendaForm.controls;
    switch (this.currentStep) {
      case 1:
        return controls['remitenteNombre'].valid && controls['remitenteTelefono'].valid && controls['remitenteDireccion'].valid;
      case 2:
        return controls['destinatarioNombre'].valid && controls['destinatarioTelefono'].valid && controls['destinatarioDireccion'].valid;
      case 3:
        return controls['paqueteDescripcion'].valid && controls['paquetePeso'].valid && controls['paqueteValor'].valid;
      default:
        return true;
    }
  }

  onSubmit() {
    if (this.encomiendaForm.valid) {
      this.trackingCode = 'ENV' + Math.random().toString(36).substr(2, 8).toUpperCase();
      this.password = Math.random().toString(36).substr(2, 8).toUpperCase();
      this.today = new Date();
      this.showReceipt = true;
    }
  }

  goToDashboard() {
    this.router.navigate(['/empleado-dashboard']);
  }
}
