import { Component, OnInit, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ClienteService } from 'src/app/services-admin/Dashboard-admin-services/cliente.service';
import { EmpleadoService } from 'src/app/services-admin/Dashboard-admin-services/empleado.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {
  empleados: any[] = [];
  clientes: any[] = [];
  nuevoEmpleado: any = {}; // Objeto para el nuevo empleado
  nuevoCliente: any = {}; // Objeto para el nuevo cliente

  // Variables para controlar los modales

  isModalCrearEmpleado: boolean = false;
  isModalEditarEmpleado: boolean = false;
  isModalEliminarEmpleado: boolean = false;
  isModalCrearCliente: boolean = false;
  isModalEditarCliente: boolean = false;
  isModalEliminarCliente: boolean = false;

  // Variables para editar y eliminar
  empleadoEditar: any = null;
  empleadoEliminar: any = null;
  clienteEditar: any = null;
  clienteEliminar: any = null;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private empleadoService: EmpleadoService,
    private clienteService: ClienteService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {2
    this.cargarEmpleados();
    this.cargarClientes();
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
// Métodos para Empleados
crearEmpleado() {
  this.empleadoService.crearEmpleado(this.nuevoEmpleado).subscribe(
    (response) => {
      this.empleados.push(response); // Agrega el nuevo empleado a la lista
      console.log('Empleado creado', response);
      this.nuevoEmpleado = {}; 
      this.cerrarModalCrearEmpleado(); 
    },
    (error) => {
      console.error('Error al crear empleado', error);
    }
  );
}

abrirModalCrearEmpleado() {
  this.isModalCrearEmpleado = true;
  this.nuevoEmpleado = {}; // Resetea los datos del nuevo empleado
}

cerrarModalCrearEmpleado() {
  this.isModalCrearEmpleado = false;
}

abrirModalEditarEmpleado(empleado: any) {
  console.log('Empleado recibido para editar:', empleado);
  if (!empleado || !empleado.idempleado) { // Nota: usamos `idempleado`
    console.error('Empleado inválido:', empleado);
    return;
  }
  this.empleadoEditar = { ...empleado };
  this.isModalEditarEmpleado = true;
}



cerrarModalEditarEmpleado() {
  this.isModalEditarEmpleado = false;
  this.empleadoEditar = null;
}

abrirModalEliminarEmpleado(idEmpleado: number) {
  const empleado = this.empleados.find(e => e.idEmpleado === idEmpleado);
  if (empleado) {
    this.empleadoEliminar = empleado;
    this.isModalEliminarEmpleado = true;
  } else {
    console.error('Empleado no encontrado para eliminar.');
  }
}

cerrarModalEliminarEmpleado() {
  this.isModalEliminarEmpleado = false;
  this.empleadoEliminar = null;
}

editarEmpleado() {
  if (!this.empleadoEditar || !this.empleadoEditar.idempleado) {
    console.error('Empleado a editar no está definido correctamente.');
    return;
  }

  this.empleadoService.editarEmpleado(this.empleadoEditar).subscribe(
    (response) => {
      console.log('Empleado editado', response);
      this.cerrarModalEditarEmpleado();
      this.cargarEmpleados();
    },
    (error) => {
      console.error('Error al editar empleado', error);
    }
  );
}
cargarEmpleados() {
  this.empleadoService.getEmpleados().subscribe(
    (data) => {
      // Normaliza las claves para que sean consistentes
      this.empleados = data.map((empleado: any) => ({
        ...empleado,
        idEmpleado: empleado.idempleado, // Renombra a idEmpleado
      }));
    },
    (error) => {
      console.error('Error al cargar empleados', error);
    }
  );
}


eliminarEmpleado(idEmpleado: number) {
  if (!idEmpleado) {
    console.error('ID de empleado no válido.');
    return;
  }

  this.empleadoService.eliminarEmpleado(idEmpleado).subscribe(
    (response) => {
      this.empleados = this.empleados.filter((emp) => emp.idEmpleado !== idEmpleado);
      console.log('Empleado eliminado', response);
      this.cerrarModalEliminarEmpleado(); // Cierra el modal
    },
    (error) => {
      console.error('Error al eliminar empleado', error);
    }
  );
}

  // Métodos para Clientes
  crearCliente() {
    this.clienteService.crearCliente(this.nuevoCliente).subscribe(
      (response) => {
        this.clientes.push(response); 
        console.log('Cliente creado', response);
        this.nuevoCliente = {};
        this.cerrarModalCrearCliente(); 
      },
      (error) => {
        console.error('Error al crear cliente', error);
      }
    );
  }

  abrirModalCrearCliente() {
    this.isModalCrearCliente = true;
    this.nuevoCliente = {}; // Resetea los datos del nuevo cliente
  }

  cerrarModalCrearCliente() {
    this.isModalCrearCliente = false;
  }

  abrirModalEditarCliente(cliente: any) {
    this.clienteEditar = { ...cliente };
    this.isModalEditarCliente = true;
  }

  cerrarModalEditarCliente() {
    this.isModalEditarCliente = false;
    this.clienteEditar = null;
  }

  abrirModalEliminarCliente(idCliente: number) {
    const cliente = this.clientes.find(c => c.idCliente === idCliente);
    if (cliente) {
      this.clienteEliminar = cliente;
      this.isModalEliminarCliente = true;
    } else {
      console.error('Cliente no encontrado para eliminar.');
    }
  }

  cerrarModalEliminarCliente() {
    this.isModalEliminarCliente = false;
    this.clienteEliminar = null;
  }

  editarCliente() {
    if (!this.clienteEditar || !this.clienteEditar.idCliente) {
      console.error('Cliente a editar no está definido correctamente.');
      return;
    }

    this.clienteService.editarCliente(this.clienteEditar).subscribe(
      (response) => {
        console.log('Cliente editado', response);
        this.cerrarModalEditarCliente(); // Cierra el modal
        this.cargarClientes(); // Recarga la lista de clientes
      },
      (error) => {
        console.error('Error al editar cliente', error);
      }
    );
  }

  eliminarCliente(idCliente: number) {
    if (!idCliente) {
      console.error('ID de cliente no válido.');
      return;
    }

    this.clienteService.eliminarCliente(idCliente).subscribe(
      (response) => {
        this.clientes = this.clientes.filter((cli) => cli.idCliente !== idCliente);
        console.log('Cliente eliminado', response);
        this.cerrarModalEliminarCliente(); // Cierra el modal
      },
      (error) => {
        console.error('Error al eliminar cliente', error);
      }
    );
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
