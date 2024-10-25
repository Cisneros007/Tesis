import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-envio-crear',
  templateUrl: './envio-crear.component.html',
  styleUrls: ['./envio-crear.component.css']
})
export class EnvioCrearComponent {
  encomiendaForm: FormGroup;
  currentStep = 1;
  stepsCompleted = [false, false, false, false];

  constructor(private fb: FormBuilder, private router: Router) { // Inyecta Router
    this.encomiendaForm = this.fb.group({
      remitenteNombre: ['', Validators.required],
      remitenteTelefono: ['', Validators.required],
      remitenteDireccion: ['', Validators.required],
      destinatarioNombre: ['', Validators.required],
      destinatarioTelefono: ['', Validators.required],
      destinatarioDireccion: ['', Validators.required],
      paqueteDescripcion: ['', Validators.required],
      paquetePeso: ['', Validators.required],
      manipulacionEspecial: [false]
    });
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
    const controls = this.encomiendaForm.controls;
    switch (this.currentStep) {
      case 1:
        return controls['remitenteNombre'].valid &&
               controls['remitenteTelefono'].valid &&
               controls['remitenteDireccion'].valid;
      case 2:
        return controls['destinatarioNombre'].valid &&
               controls['destinatarioTelefono'].valid &&
               controls['destinatarioDireccion'].valid;
      case 3:
        return controls['paqueteDescripcion'].valid &&
               controls['paquetePeso'].valid;
      default:
        return true;
    }
  }

  getStepClass(step: number): string {
    if (this.stepsCompleted[step - 1]) {
      return 'completed';
    } else if (step === this.currentStep) {
      return 'active';
    }
    return '';
  }

  onSubmit() {
    if (this.encomiendaForm.valid) {
      console.log(this.encomiendaForm.value);
      // Aquí puedes manejar el envío de los datos o realizar cualquier otra acción.
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']); // Navega al dashboard
  }
}
