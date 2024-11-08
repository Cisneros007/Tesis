import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/api/clientes'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente);
  }

  editarCliente(cliente: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${cliente.idCliente}`, cliente);
  }

  eliminarCliente(idCliente: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idCliente}`);
  }
}


