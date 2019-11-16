import { DatePipe } from '@angular/common';
import { User } from './users';

export class Departamento {
  _id: string;
  nombre: string;
  responsable: User;
  usuarios: User[];
}
