import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Agencia {
  name: string;
  address: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-agencias-admin',
  templateUrl: './agencias-admin.component.html',
  styleUrls: ['./agencias-admin.component.css']
})
export class AgenciasAdminComponent implements OnInit {
  searchQuery: string = '';
  agencias: Agencia[] = [];
  filteredAgencias: Agencia[] = [];
  newAgencia: Agencia = { name: '', address: '', phone: '', email: '' };
  
  editMode: boolean = false;
  editingAgencia: Agencia | null = null;
  showModalEdit: boolean = false;
  showDeleteAlert: boolean = false;
  agenciaToDelete: Agencia | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.agencias = [
      { name: 'Miraflores', address: 'Av. Pardo y Aliaga 123', phone: '987654321', email: 'miraflores@example.com' },
      { name: 'San Isidro', address: 'Calle Los Conquistadores 456', phone: '987654322', email: 'sanisidro@example.com' },
      { name: 'Surco', address: 'Av. La Encalada 789', phone: '987654323', email: 'surco@example.com' },
    ];
    this.filteredAgencias = [...this.agencias];
  }

  searchLocation(): void {
    const queryLowerCase = this.searchQuery.trim().toLowerCase();
    this.filteredAgencias = queryLowerCase
      ? this.agencias.filter(agencia =>
          agencia.name.toLowerCase().includes(queryLowerCase) ||
          agencia.address.toLowerCase().includes(queryLowerCase)
        )
      : [...this.agencias];
  }

  addAgencia(): void {
    if (this.newAgencia.name && this.newAgencia.address) {
      this.agencias.push({ ...this.newAgencia });
      this.filteredAgencias = [...this.agencias];
      this.newAgencia = { name: '', address: '', phone: '', email: '' };
    }
  }

  openEditModal(agencia: Agencia): void {
    this.showModalEdit = true;
    this.editingAgencia = { ...agencia };
  }

  saveAgencia(): void {
    if (this.editingAgencia) {
      const index = this.agencias.findIndex(a => a.name === this.editingAgencia!.name);
      if (index > -1) {
        this.agencias[index] = { ...this.editingAgencia };
        this.filteredAgencias = [...this.agencias];
        this.closeEditModal();
      }
    }
  }

  closeEditModal(): void {
    this.showModalEdit = false;
    this.editingAgencia = null;
  }

  openDeleteAlert(agencia: Agencia): void {
    this.showDeleteAlert = true;
    this.agenciaToDelete = agencia;
  }

  confirmDelete(): void {
    if (this.agenciaToDelete) {
      this.agencias = this.agencias.filter(a => a !== this.agenciaToDelete);
      this.filteredAgencias = [...this.agencias];
      this.closeDeleteAlert();
    }
  }

  closeDeleteAlert(): void {
    this.showDeleteAlert = false;
    this.agenciaToDelete = null;
  }
}
