import { Component, OnInit,NgModule } from '@angular/core';
import { Router } from '@angular/router'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from "src/app/services/user.service";
import { VacationService } from "src/app/services/vacation.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { User } from 'src/app/models/users';
import { Vacation } from 'src/app/models/Vacation';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {
  usuarioLogueado: User;
  vacation: Vacation;
  vacacionesUsuario: Date[];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['usuario', 'asunto', 'mensaje', 'estado'];

  constructor( 
    private router: Router,
    private userService: UserService,
    private authService: AuthenticationService,
    private vacationService: VacationService) { 
  }


  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => (this.usuarioLogueado = user));
    console.log("holaa");
    console.log(this.usuarioLogueado);
    //this.vacationService.getVacationByUsername(this.usuarioLogueado._id).then(vac=> if(pending==undefined){}else{(this.vacation = vac)});
    //console.log("hollaaa" + this.vacation.pending);
    //this.vacacionesUsuario = this.vacation.pending;
  }

}