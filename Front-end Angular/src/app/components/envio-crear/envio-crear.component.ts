import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agencia } from 'src/app/models-cliente/agencia.model';
import { Encomienda } from 'src/app/models-cliente/encomiendas.model';
import { AgenciasService } from 'src/app/services-cliente/agencias.service';
import { EncomiendasService } from 'src/app/services-cliente/encomiendas.service';

@Component({
  selector: 'app-envio-crear',
  templateUrl: './envio-crear.component.html',
  styleUrls: ['./envio-crear.component.css']
})
export class EnvioCrearComponent implements OnInit {
  encomiendas: Encomienda[] = [];
  agencias: Agencia[] = [];
  filteredAgencias: Agencia[] = [];
  encomiendaForm: FormGroup;

  // Variables auxiliares
  currentStep = 1; // Control del paso actual en el formulario
  stepsCompleted: boolean[] = [false, false, false, false];
  preciosDistritos: { [key: string]: number } = {}; 
  trackingCode: string = '';
  password: string = '';
  today: Date | null = null;
  showReceipt = false;

  constructor(
    private agenciasService: AgenciasService,
    private encomiendasService: EncomiendasService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializar el formulario
    this.encomiendaForm = this.fb.group({
      remitenteNombre: ['', Validators.required],
      remitenteTelefono: ['', Validators.required],
      remitenteDireccion: ['', Validators.required],
      destinatarioNombre: ['', Validators.required],
      destinatarioTelefono: ['', Validators.required],
      destinatarioDireccion: ['', Validators.required],
      paqueteDescripcion: ['', Validators.required],
      paquetePeso: ['', [Validators.required, Validators.min(0.1)]],
      paqueteValor: ['', [Validators.required, Validators.min(0)]],
      servicioDomicilio: ['', Validators.required],
      distritos: [''],
      costoServicioDomicilio: [0],
      aceptoTerminos: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.loadAgencias(); // Cargar las agencias
  }

  // Cargar agencias desde el servicio
  loadAgencias(): void {
    this.agenciasService.getAgencias().subscribe((data: Agencia[]) => {
      this.agencias = data; 
    });
  }

  generateTrackingCode(): string {
    return 'ENV' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  generatePassword(): string {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  }

  nextStep(): void {
    if (this.currentStep < 4 && this.isStepValid()) {
      this.stepsCompleted[this.currentStep - 1] = true;
      this.currentStep++;
    }
  }

  prevStep(): void {
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
          controls['paquetePeso'].valid &&
          controls['paqueteValor'].valid;
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

  onSubmit(): void {
    if (this.encomiendaForm.valid) {
      
      this.trackingCode = this.generateTrackingCode();
      this.password = this.generatePassword();

      // Agregar los valores generados al formulario
      const encomiendaData = {
        ...this.encomiendaForm.value,
        trackingCode: this.trackingCode,
        password: this.password,
        fechaRegistro: new Date() // Registrar la fecha actual
      };

      // Llamar al servicio para crear la encomienda
      this.encomiendasService.crearEncomienda(encomiendaData).subscribe(
        (response) => {
          console.log('Encomienda creada:', response);
          this.showReceipt = true; // Mostrar recibo
        },
        (error) => {
          console.error('Error al crear encomienda:', error);
        }
      );
    }
  }

  actualizarCostoServicioDomicilio(distrito: string): void {
    if (this.encomiendaForm.value.servicioDomicilio === 'si' && distrito) {
      this.encomiendaForm.patchValue({
        costoServicioDomicilio: this.preciosDistritos[distrito] || 0
      });
    }
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  imprimirBoleta(): void {
    window.print();
  }
}
