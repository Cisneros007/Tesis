import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosTerrestresService {
  private apiUrl = 'http://localhost:3000/api/servicios-terrestres'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los servicios terrestres
  obtenerServicios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Agregar un nuevo servicio terrestre
  agregarServicio(servicio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, servicio);
  }

  // Eliminar un servicio terrestre por ID
  eliminarServicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
