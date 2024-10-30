import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  // Un objeto para mantener el estado de los submenús abiertos
  public isOpen: { [key: string]: boolean } = {};

  // Función para alternar el estado del submenú
  toggleSubmenu(key: string) {
    this.isOpen[key] = !this.isOpen[key];
  }
}
