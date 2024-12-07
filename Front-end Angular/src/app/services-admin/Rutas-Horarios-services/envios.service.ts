import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {
  private apiUrl = 'http://localhost:3000/api/envios'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  getEnvios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarEnvio(envio: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, envio); // Cambia la URL según tu API
  }

  editarEnvio(envio: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${envio.id}`, envio); // Cambia la URL según tu API
  }

  eliminarEnvio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Cambia la URL según tu API
  }
}
