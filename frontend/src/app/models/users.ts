import { DatePipe } from '@angular/common';
import { Departamento } from './departamento';

export class User {
  _id: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: Date;
  email: string;
  localidad: string;
  provincia: string;
  domicilio: string;
  telefono: number;
  gestor: boolean;
  admin: boolean;
  nuss: number;
  deleted: boolean;
  username: string;
  password: string;
  becario: boolean;
}
