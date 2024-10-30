import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
}

interface Envio {
  id: number;
  nombreEnvio: string;
  fechaEnvio: string;
  horaEnvio: string;
  estado: string;
  descripcion: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuario: Usuario;
  historialEnvios: Envio[] = [];
  envioSeleccionado: Envio | null = null;

  // Modal states
  mostrarModalEditarUsuario = false;
  mostrarModalEliminarUsuario = false;

  // Temporary editing state
  usuarioEditando: Usuario | null = null;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.usuario = {
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '123-456-7890'
    };

    this.historialEnvios = [
      {
        id: 1,
        nombreEnvio: 'Paquete 1',
        fechaEnvio: '2024-10-01',
        horaEnvio: '10:00',
        estado: 'En tránsito',
        descripcion: 'Descripción del paquete 1'
      },
      {
        id: 2,
        nombreEnvio: 'Paquete 2',
        fechaEnvio: '2024-10-05',
        horaEnvio: '12:30',
        estado: 'Entregado',
        descripcion: 'Descripción del paquete 2'
      }
    ];
  }

  ngOnInit(): void {
    // Additional initialization if necessary
  }

  verDetallesEnvio(envio: Envio): void {
    this.envioSeleccionado = envio;
  }

  cerrarDetalles(): void {
    this.envioSeleccionado = null;
  }

  // Modal handlers for User
  abrirModalEditarUsuario(): void {
    this.usuarioEditando = { ...this.usuario };
    this.mostrarModalEditarUsuario = true;
  }

  guardarEditarUsuario(): void {
    if (this.usuarioEditando) {
      this.usuario = { ...this.usuarioEditando };
      this.mostrarModalEditarUsuario = false;
      this.usuarioEditando = null;
    }
  }

  abrirModalEliminarUsuario(): void {
    this.mostrarModalEliminarUsuario = true;
  }

  confirmarEliminarUsuario(): void {
    this.usuario = null!; // This removes the current user
    this.historialEnvios = []; // Clears the shipment history
    this.mostrarModalEliminarUsuario = false;
    // Redirect the user to the login page
    this.router.navigate(['/login']);
  }

  logOut(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
