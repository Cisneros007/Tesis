import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ClienteService } from 'src/app/services-admin/cliente.service';
import { UsuarioService } from 'src/app/services-admin/usuario.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {
  usuarios: any[] = [];
  clientes: any[] = [];
  nuevoUsuario: any = {}; // Objeto para el nuevo usuario
  nuevoCliente: any = {}; // Objeto para el nuevo cliente

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarClientes();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al cargar clientes', error);
      }
    );
  }

  crearUsuario() {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        this.usuarios.push(response); // Agrega el nuevo usuario a la lista
        console.log('Usuario creado', response);
        this.nuevoUsuario = {}; // Reinicia el objeto del nuevo usuario
      },
      (error) => {
        console.error('Error al crear usuario', error);
      }
    );
  }

  crearCliente() {
    this.clienteService.crearCliente(this.nuevoCliente).subscribe(
      (response) => {
        this.clientes.push(response); // Agrega el nuevo cliente a la lista
        console.log('Cliente creado', response);
        this.nuevoCliente = {}; // Reinicia el objeto del nuevo cliente
      },
      (error) => {
        console.error('Error al crear cliente', error);
      }
    );
  }

  editarUsuario(usuario: any) {
    console.log('Editar Usuario', usuario);
  }

  eliminarUsuario(idusuario: number) {
    console.log('Eliminar Usuario', idusuario);
  }

  editarCliente(cliente: any) {
    console.log('Editar Cliente', cliente);
  }

  eliminarCliente(idCliente: number) {
    console.log('Eliminar Cliente', idCliente);
  }

  ngAfterViewInit(): void {
    this.setupToggleButtons();
  }

  private setupToggleButtons(): void {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar');
    const toggleButtons = sidebar.querySelectorAll('.toggle-submenu');

    const closeAllSubmenus = () => {
      sidebar.querySelectorAll('.submenu').forEach((submenu: HTMLElement) => {
        this.renderer.setStyle(submenu, 'display', 'none');
      });
      toggleButtons.forEach((button: HTMLElement) => {
        this.renderer.removeClass(button, 'active');
      });
    };

    toggleButtons.forEach((button: HTMLElement) => {
      this.renderer.listen(button, 'click', (e: Event) => {
        e.preventDefault();
        const submenu = button.nextElementSibling as HTMLElement;

        if (submenu.style.display === 'block') {
          this.renderer.setStyle(submenu, 'display', 'none');
          this.renderer.removeClass(button, 'active');
        } else {
          closeAllSubmenus();
          this.renderer.setStyle(submenu, 'display', 'block');
          this.renderer.addClass(button, 'active');
        }
      });
    });

    this.renderer.listen('document', 'click', (e: Event) => {
      if (!sidebar.contains(e.target as Node)) {
        closeAllSubmenus();
      }
    });
  }
}
