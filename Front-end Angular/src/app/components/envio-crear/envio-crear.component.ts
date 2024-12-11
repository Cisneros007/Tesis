import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncomiendasService } from '../../services-cliente/encomiendas.service';  // Asegúrate de que la ruta sea correcta
import { Encomienda } from '../../models-cliente/encomiendas.model';  // Asegúrate de que la ruta sea correcta
import { AgenciasService } from '../../services-cliente/agencias.service';  // Importar el servicio de Agencias

@Component({
  selector: 'app-envio-crear',
  templateUrl: './envio-crear.component.html',
  styleUrls: ['./envio-crear.component.css'],
})
export class EnvioCrearComponent implements OnInit {
getAgenciaNombre(arg0: any) {
throw new Error('Method not implemented.');
}
  envioForm: FormGroup;
  agencias: any[] = [];  // Para almacenar las agencias de la API

  constructor(
    private formBuilder: FormBuilder,
    private encomiendasService: EncomiendasService,
    private agenciasService: AgenciasService  // Inyectar el servicio de Agencias
  ) {
    // Inicializar el formulario
    this.envioForm = this.formBuilder.group({
      remitenteNombre: ['', Validators.required],
      remitenteTelefono: [''],
      destinatarioNombre: ['', Validators.required],
      destinatarioTelefono: [''],
      paqueteDescripcion: [''],
      paquetePeso: ['', [Validators.required, Validators.min(0)]],
      paqueteValor: ['', [Validators.required, Validators.min(0)]],
      servicioDomicilio: [false],
      costoServicioDomicilio: [''],
      fechaCreacion: [new Date()],
      origenAgencia: ['', Validators.required],  // Campo de agencia de origen
      destinoAgencia: ['', Validators.required],  // Campo de agencia de destino
    });
  }

  ngOnInit(): void {
    // Obtener la lista de agencias desde el servicio
    this.agenciasService.getAgencias().subscribe(
      (data) => {
        this.agencias = data;  // Asignar las agencias a la variable
      },
      (error) => {
        console.error('Error al cargar las agencias:', error);
        alert('Error al cargar las agencias');
      }
    );
  }

  // Método para crear la encomienda
  crearEncomienda(): void {
    if (this.envioForm.valid) {
      const encomienda: Encomienda = this.envioForm.value;
      
      this.encomiendasService.crearEncomienda(encomienda).subscribe(
        (response) => {
          console.log('Encomienda creada:', response);
          alert('Encomienda creada correctamente');
        },
        (error) => {
          console.error('Error al crear encomienda:', error);
          alert('Error al crear la encomienda');
          console.error('Error details:', error); // Mostrar detalles del error
        }
      );
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
  
}
