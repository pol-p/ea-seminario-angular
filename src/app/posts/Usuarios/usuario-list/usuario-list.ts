import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-list.html'
})
export class UsuarioList implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUsuarios().subscribe(data => {
      this.usuarios = data.usuario;
    });
  }

  editUsuario(user: Usuario) {
    const nuevoNombre = prompt('Nuevo nombre:', user.name);

    if (nuevoNombre && nuevoNombre.trim() !== '') {
      this.api.updateUsuario(
        user._id,
        nuevoNombre,
        typeof user.organizacion === 'string'
          ? user.organizacion
          : user.organizacion._id
      ).subscribe(() => {
        user.name = nuevoNombre;
      });
    }
  }
}