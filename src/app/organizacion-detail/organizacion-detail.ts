import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrganizacionService } from '../services/organizacion.service';
import { UsuarioService } from '../services/usuario.service';
import { Organizacion } from '../models/organizacion.model';
import { Usuario } from '../models/usuario.model';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-organizacion-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule],
  templateUrl: './organizacion-detail.html',
  styleUrls: ['./organizacion-detail.css'],
})
export class OrganizacionDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private apiOrg = inject(OrganizacionService);
  private apiUser = inject(UsuarioService);

  organizacion = signal<Organizacion | null>(null);
  loading = signal(true);
  allUsuarios = signal<Usuario[]>([]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrganizacion(id);
      this.loadAllUsuarios();
    }
  }

  loadOrganizacion(id: string): void {
    this.apiOrg.getOrganizacionById(id).subscribe({
      next: (res) => {
        this.organizacion.set(res);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadAllUsuarios(): void {
    this.apiUser.getUsuarios().subscribe(res => this.allUsuarios.set(res));
  }

  addUserToOrg(user: Usuario): void {
    const org = this.organizacion();
    if (!org) return;

    // Para añadirlo, actualizamos el usuario poniéndole el ID de esta organización
    this.apiUser.updateUsuario(user._id, user.name, user.email, '', org._id).subscribe({
      next: () => {
        this.loadOrganizacion(org._id);
      },
      error: (err) => console.error('Error al añadir usuario:', err)
    });
  }

  removeUserFromOrg(userId: string): void {
    const org = this.organizacion();
    if (!org) return;

    // Para quitarlo, buscamos los datos del usuario y le quitamos la organización (ponemos '')
    this.apiUser.getUsuarioById(userId).subscribe(user => {
      this.apiUser.updateUsuario(userId, user.name, user.email, '', '').subscribe({
        next: () => {
          this.loadOrganizacion(org._id);
        },
        error: (err) => console.error('Error al quitar usuario:', err)
      });
    });
  }
}

