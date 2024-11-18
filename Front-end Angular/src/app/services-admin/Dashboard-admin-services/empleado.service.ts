import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/empleados'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  crearEmpleado(nuevoEmpleado: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, nuevoEmpleado);
  }

  editarEmpleado(empleado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${empleado.idEmpleado}`, empleado);
  }

  eliminarEmpleado(idEmpleado: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idEmpleado}`);
  }
}
