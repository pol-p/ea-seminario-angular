import { Organizacion } from './organizacion.model';

export interface Usuario {
  _id: string;
  name: string;
  organizacion: Organizacion | string;
  createdAt?: string;
  updatedAt?: string;
}