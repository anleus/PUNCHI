import { DatePipe } from '@angular/common';
import { User } from './users';

export class Departamento {
  nombreDepartamento: string;
  responsable: User;
  usuarios: User[];
}
