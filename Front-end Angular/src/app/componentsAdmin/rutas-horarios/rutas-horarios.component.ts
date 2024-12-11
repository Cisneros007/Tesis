import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { RutasService } from 'src/app/services-admin/Rutas-Horarios-services/rutas.service';
import { EnviosService } from 'src/app/services-admin/Rutas-Horarios-services/envios.service';

@Component({
  selector: 'app-rutas-horarios',
  templateUrl: './rutas-horarios.component.html',
  styleUrls: ['./rutas-horarios.component.css']
})
export class RutasHorariosComponent implements OnInit {
  // Listas de datos
  rutas: any[] = [];
  envios: any[] = [];
  
  // Variables para modales
  mostrarModalAgregarRuta = false;
  mostrarModalEditarRuta = false;
  mostrarModalEliminarRuta = false;
  mostrarModalAgregarEnvio = false;
  mostrarModalEditarEnvio = false;
  mostrarModalEliminarEnvio = false;

  // Variables de datos de formulario
  nuevaRuta = { ruta: '', horaSalida: '', horaLlegada: '', duracion: '' };
  rutaSeleccionada: any ;
  updatedRuta = { };
  nuevoEnvio = { envio: '', fechaEnvio: '', horaEnvio: '', estado: 'Pendiente' };
  envioSeleccionado: any ;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private rutasService: RutasService,
    private enviosService: EnviosService
  ) { }

  ngOnInit(): void {

    this.cargarRutas(); // Cargar las rutas al iniciar
    this.loadEnvios(); // Cargar los envíos al iniciar
  }



  // Cargar las rutas desde la API
  cargarRutas(): void {
    this.rutasService.getRutas().subscribe((data) => {
      this.rutas = data;
    });
  }

  // Agregar una nueva ruta
agregarRuta(): void {
  if (this.nuevaRuta.ruta && this.nuevaRuta.horaSalida && this.nuevaRuta.horaLlegada && this.nuevaRuta.duracion) {
    this.rutasService.agregarRuta(this.nuevaRuta).subscribe((data) => {
      this.rutas.push(data); // Agregar la nueva ruta a la lista
      this.cerrarModalAgregarRuta(); // Cerrar modal
      this.nuevaRuta = { ruta: '', horaSalida: '', horaLlegada: '', duracion: '' }; // Limpiar formulario
    }, error => {
      console.error('Error al agregar ruta:', error); // Mostrar error en consola
    });
  } else {
    alert('Por favor, completa todos los campos');
  }
}

// Abrir el modal para agregar ruta
abrirModalAgregarRuta() {
  this.mostrarModalAgregarRuta = true;
}

// Cerrar el modal de agregar ruta
cerrarModalAgregarRuta() {
  this.mostrarModalAgregarRuta = false;
}

// Abrir el modal para editar ruta
abrirModalEditarRuta(ruta: any) {
  this.rutaSeleccionada = { ...ruta };  // Clonando la ruta seleccionada
  console.log('Ruta seleccionada para editar:', this.rutaSeleccionada);  // Debugging
  this.mostrarModalEditarRuta = true;
}

// Cerrar el modal de editar ruta
cerrarModalEditarRuta() {
  this.mostrarModalEditarRuta = false;
  this.rutaSeleccionada = null;
}

// Guardar los cambios de la ruta editada
guardarCambiosRuta() {
  if (!this.rutaSeleccionada || !this.rutaSeleccionada.id) {
    console.error('ID de ruta no válido:', this.rutaSeleccionada);
    return; // Detener la ejecución si no hay ruta seleccionada o su ID es inválido
  }

  // Actualiza la ruta en la lista local antes de hacer la llamada al servidor
  const index = this.rutas.findIndex(e => e.id === this.rutaSeleccionada.id);
  if (index > -1) {
    this.rutas[index] = { ...this.rutaSeleccionada };
  }

  console.log('Datos enviados al servidor:', this.rutaSeleccionada);

  // Llamada al servicio para actualizar la ruta
  this.rutasService.editarRuta(this.rutaSeleccionada).subscribe(
    (response) => {
      console.log('Ruta actualizada correctamente', response);
      this.cerrarModalEditarRuta(); // Cierra el modal después de actualizar
    },
    (error) => {
      console.error('Error al actualizar la ruta', error);
    }
  );
}


// Abrir el modal para eliminar ruta
abrirModalEliminarRuta(ruta: any) {
  this.rutaSeleccionada = { ...ruta }; // Clonar la ruta seleccionada
  this.mostrarModalEliminarRuta = true; // Abrir el modal de eliminación
}

// Cerrar el modal de eliminación
cerrarModalEliminarRuta() {
  this.mostrarModalEliminarRuta = false; // Cerrar el modal
  this.rutaSeleccionada = null; // Limpiar la ruta seleccionada
}

// Confirmar y eliminar la ruta seleccionada
confirmarEliminarRuta() {
  if (!this.rutaSeleccionada || !this.rutaSeleccionada.id) {
    console.error('ID de ruta no válido.');
    return;
  }

  this.rutasService.eliminarRuta(this.rutaSeleccionada.id).subscribe(
    (response: any) => {
      this.rutas = this.rutas.filter((ruta) => ruta.id !== this.rutaSeleccionada.id);
      this.cerrarModalEliminarRuta();
    },
    (error: any) => {
      console.error('Error al eliminar ruta', error);
    }
  );
}


  

  // Métodos de control de envíos
  loadEnvios(): void {
    this.enviosService.getEnvios().subscribe((data: any) => {
      this.envios = data;
    });
  }

  agregarEnvio(envio: string, fechaEnvio: string, horaEnvio: string, estado: string): void {
    const nuevoEnvio = { envio, fechaEnvio, horaEnvio, estado };
    this.enviosService.agregarEnvio(nuevoEnvio).subscribe((data: any) => {
      this.envios.push(data); // Agregar el nuevo envío a la lista
      this.cerrarModalAgregarEnvio(); // Cerrar modal
    });
  }

  abrirModalAgregarEnvio() {
    this.mostrarModalAgregarEnvio = true;
  }

  cerrarModalAgregarEnvio() {
    this.mostrarModalAgregarEnvio = false;
    this.nuevoEnvio = { envio: '', fechaEnvio: '', horaEnvio: '', estado: 'Pendiente' };
  }

  abrirModalEditarEnvio(envio: any) {
    this.envioSeleccionado = { ...envio };
    this.mostrarModalEditarEnvio = true;
  }

  cerrarModalEditarEnvio() {
    this.mostrarModalEditarEnvio = false;
    this.envioSeleccionado = null;
  }
  abrirModalEliminarEnvio(envio: any) {
    this.envioSeleccionado = { ...envio }; // Clonar el envío seleccionado
    this.mostrarModalEliminarEnvio = true; // Abrir el modal de eliminación
  }

  cerrarModalEliminarEnvio() {
    this.mostrarModalEliminarEnvio = false; // Cerrar el modal
    this.envioSeleccionado = null; // Limpiar el envío seleccionado
  }

  confirmarEliminarEnvio() {
    if (this.envioSeleccionado) {
      this.enviosService.eliminarEnvio(this.envioSeleccionado.id).subscribe(
        response => {
          console.log('Envío eliminado');
          this.cerrarModalEliminarEnvio(); // Cerrar modal si es exitoso
        },
        error => {
          console.error('Error al eliminar el envío', error);
        }
      );
    }
  }
  guardarNuevoEnvio() {
    this.enviosService.agregarEnvio(this.nuevoEnvio).subscribe(response => {
      console.log('Envio guardado', response);
      // Aquí podrías realizar alguna acción después de guardar la ruta.
    });
  }

  guardarCambiosEnvio() {
    if (!this.envioSeleccionado || !this.envioSeleccionado.id) {
      console.error('ID de envío no válido:', this.envioSeleccionado);
      return; // Detener la ejecución si no hay envío seleccionado o su ID es inválido
    }
  
    // Verifica los datos antes de enviarlos
    console.log('Envío a actualizar:', this.envioSeleccionado);
  
    // Llamada al servicio para actualizar el envío en el servidor
    this.enviosService.editarEnvio(this.envioSeleccionado).subscribe(
      (response) => {
        console.log('Envío actualizado correctamente', response);
  
        // Si la actualización fue exitosa, actualiza la lista local
        const index = this.envios.findIndex(e => e.id === this.envioSeleccionado.id);
        if (index > -1) {
          this.envios[index] = { ...this.envioSeleccionado }; // Actualiza la lista local con los nuevos datos
        }
  
        this.cerrarModalEditarEnvio(); // Cierra el modal después de actualizar
      },
      (error) => {
        console.error('Error al actualizar el envío', error);
      }
    );
  }
  
  

  eliminarEnvio(envio: any): void {
    this.enviosService.eliminarEnvio(envio.id).subscribe(() => {
      this.envios = this.envios.filter(e => e.id !== envio.id);
      this.envioSeleccionado = null; // Limpiar el envío seleccionado
    });
  }

}