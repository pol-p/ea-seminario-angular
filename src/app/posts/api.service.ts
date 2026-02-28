import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organizacion } from '../models/organizacion.model';
import { Usuario } from '../models/usuario.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // =========================
  // ORGANIZACIONES
  // =========================

  getOrganizaciones(): Observable<{ organizaciones: Organizacion[] }> {
    return this.http.get<{ organizaciones: Organizacion[] }>(
      `${this.baseUrl}/organizaciones/get`
    );
  }

  getOrganizacionById(organizacionId: string): Observable<{ organizacion: Organizacion }> {
    return this.http.get<{ organizacion: Organizacion }>(
      `${this.baseUrl}/organizaciones/get/${organizacionId}`
    );
  }

  createOrganizacion(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/organizaciones/create`, { name });
  }

  updateOrganizacion(organizacionId: string, name: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/organizaciones/update/${organizacionId}`, { name });
  }

  deleteOrganizacion(organizacionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/organizaciones/delete/${organizacionId}`);
  }

  // =========================
  // USUARIOS
  // =========================

  // OJO: en tu backend está definido como router.get('/get/', ...)
  getUsuarios(): Observable<{ usuario: Usuario[] }> {
    return this.http.get<{ usuario: Usuario[] }>(
      `${this.baseUrl}/usuarios/get/`
    );
  }

  getUsuarioById(usuarioId: string): Observable<{ usuario: Usuario }> {
    return this.http.get<{ usuario: Usuario }>(
      `${this.baseUrl}/usuarios/get/${usuarioId}`
    );
  }

  createUsuario(name: string, organizacion: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/create`, { name, organizacion });
  }

  updateUsuario(usuarioId: string, name: string, organizacion: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/usuarios/update/${usuarioId}`, { name, organizacion });
  }

  deleteUsuario(usuarioId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/usuarios/delete/${usuarioId}`);
  }
}