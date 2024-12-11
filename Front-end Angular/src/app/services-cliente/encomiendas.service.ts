import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encomienda } from '../models-cliente/encomiendas.model';

@Injectable({
  providedIn: 'root',
})
export class EncomiendasService {
  getDistritosYPricios() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/encomiendas';  

  constructor(private http: HttpClient) {}

  // Obtener todas las encomiendas
  getEncomiendas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva encomienda
  crearEncomienda(encomienda: Encomienda): Observable<any> {
    return this.http.post(this.apiUrl, encomienda);
  }

  // Editar una encomienda existente
  editarEncomienda(encomienda: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${encomienda.idEncomienda}`, encomienda);
  }

  // Eliminar una encomienda por ID
  eliminarEncomienda(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
