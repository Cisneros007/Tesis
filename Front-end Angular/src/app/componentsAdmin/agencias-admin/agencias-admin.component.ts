import { Component, OnInit } from '@angular/core';
import { AgenciasService } from 'src/app/services-cliente/agencias.service';
import { Agencia } from 'src/app/models-cliente/agencia.model';

@Component({
  selector: 'app-agencias-admin',
  templateUrl: './agencias-admin.component.html',
  styleUrls: ['./agencias-admin.component.css']
})
export class AgenciasAdminComponent implements OnInit {
  searchQuery: string = '';
  agencias: Agencia[] = [];
  filteredAgencias: Agencia[] = [];
  newAgencia: Agencia = {
    id: 0,
    nombre: '',
    direccion: '',
    latitude: 0,
    longitude: 0,
    email: '',
    image: ''
  };

  editMode: boolean = false;
  editingAgencia: Agencia | null = null;
  showModalEdit: boolean = false;
  showDeleteAlert: boolean = false;
  agenciaToDelete: Agencia | null = null;

  constructor(private agenciasService: AgenciasService) {}

  ngOnInit(): void {
    this.loadAgencias();
  }

  // Cargar todas las agencias desde el backend
  loadAgencias(): void {
    this.agenciasService.getAgencias().subscribe({
      next: (data: Agencia[]) => {
        this.agencias = data;
        this.filteredAgencias = [...this.agencias];
      },
      error: (err) => console.error('Error al cargar agencias:', err),
    });
  }

  // Buscar agencias por nombre o email
  searchLocation(): void {
    const queryLowerCase = this.searchQuery.trim().toLowerCase();
    this.filteredAgencias = queryLowerCase
      ? this.agencias.filter(
          (agencia) =>
            agencia.nombre.toLowerCase().includes(queryLowerCase) ||
            agencia.email.toLowerCase().includes(queryLowerCase)
        )
      : [...this.agencias];
  }

  // Crear una nueva agencia
  addAgencia(): void {
    if (this.newAgencia.nombre && this.newAgencia.email) {
      this.agenciasService.crearAgencia(this.newAgencia).subscribe({
        next: (response) => {
          this.loadAgencias(); // Recargar la lista después de agregar
          this.newAgencia = {
            id: 0,
            nombre: '',
            direccion: '',
            latitude: 0,
            longitude: 0,
            email: '',
            image: ''
          };
        },
        error: (err) => console.error('Error al crear agencia:', err),
      });
    }
  }

  // Abrir modal de edición
  openEditModal(agencia: Agencia): void {
    this.showModalEdit = true;
    this.editingAgencia = { ...agencia };
  }

  // Guardar cambios de una agencia editada
  saveAgencia(): void {
    if (this.editingAgencia) {
      this.agenciasService.editarAgencia(this.editingAgencia).subscribe({
        next: () => {
          this.loadAgencias(); // Recargar la lista después de editar
          this.closeEditModal();
        },
        error: (err) => console.error('Error al editar agencia:', err),
      });
    }
  }

  // Cerrar modal de edición
  closeEditModal(): void {
    this.showModalEdit = false;
    this.editingAgencia = null;
  }

  // Abrir alerta de confirmación de eliminación
  openDeleteAlert(agencia: Agencia): void {
    this.showDeleteAlert = true;
    this.agenciaToDelete = agencia;
  }

  // Confirmar y eliminar una agencia
  confirmDelete(): void {
    if (this.agenciaToDelete) {
      this.agenciasService.eliminarAgencia(this.agenciaToDelete.id).subscribe({
        next: () => {
          this.loadAgencias(); 
          this.closeDeleteAlert();
        },
        error: (err) => console.error('Error al eliminar agencia:', err),
      });
    }
  }

  // Cerrar alerta de eliminación
  closeDeleteAlert(): void {
    this.showDeleteAlert = false;
    this.agenciaToDelete = null;
  }
}
