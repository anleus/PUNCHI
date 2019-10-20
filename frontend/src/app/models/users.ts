import { DatePipe } from '@angular/common';

export class User {
  _id: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
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
