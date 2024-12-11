import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgenciasService {
  private apiUrl = 'http://localhost:3000/api/agencias';

  constructor(private http: HttpClient) {}

  // Obtener todas las agencias
  getAgencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva agencia
  crearAgencia(agencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, agencia);
  }

  // Editar una agencia existente
  editarAgencia(agencia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${agencia.id}`, agencia);
  }

  // Eliminar una agencia por ID
  eliminarAgencia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
