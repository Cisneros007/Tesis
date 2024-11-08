import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosAereosService {
  private apiUrl = 'http://localhost:3000/api/servicios-aereos'; // Cambia esto a la URL de tu API
  private servicios: any[] = []; // Puedes inicializar con datos si deseas

  constructor(private http: HttpClient) {}

  obtenerServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarServicio(servicio: any): void {
    this.servicios.push(servicio);
    // Aquí puedes agregar lógica para enviar el nuevo servicio a tu API, si es necesario
  }
  // Eliminar un servicio terrestre por ID
  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
