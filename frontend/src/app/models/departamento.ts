import { DatePipe } from '@angular/common';
import { User } from './users';

export class Departamento {
  nombre: string;
  responsable: User;
  usuarios: User[];
}
