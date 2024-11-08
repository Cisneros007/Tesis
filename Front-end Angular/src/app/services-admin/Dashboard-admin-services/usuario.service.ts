import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  editarUsuario(usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuario.idusuario}`, usuario);
  }

  eliminarUsuario(idusuario: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${idusuario}`);
  }
}
