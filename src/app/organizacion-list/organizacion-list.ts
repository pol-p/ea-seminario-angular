import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../posts/api.service';
import { Organizacion } from '../models/organizacion.model';

@Component({
  selector: 'app-organizacion-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizacion-list.html',
  styleUrls: ['./organizacion-list.css'],
})
export class OrganizacionList implements OnInit {
  organizaciones: Organizacion[] = [];
  loading = false;
  errorMsg = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMsg = '';

    this.api.getOrganizaciones().subscribe({
      next: (res) => {
        this.organizaciones = res?.organizaciones ?? [];
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'No se han podido cargar las organizaciones.';
        this.loading = false;
      },
    });
  }

  trackById(_index: number, org: Organizacion): string {
    return org._id;
  }
}