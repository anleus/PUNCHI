import { Component, OnInit, NgModule, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Observable } from "rxjs";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { UserService } from "src/app/services/user.service";
//import { VacationService } from 'src/app/services/vacation.service';
import { AuthenticationService } from "src/app/services/auth.service";
import { User } from "src/app/models/users";
import { Incidencia } from "src/app/models/Incidencia";
import { IncidenciaService } from "src/app/services/incidencia.service";

@Component({
  selector: "app-incidencias",
  templateUrl: "./incidencias.component.html",
  styleUrls: ["./incidencias.component.css"]
})
export class IncidenciasComponent implements OnInit {
  public usuarioLogueado = this.authService.getCurrentUser();
  public user: User;
  incidencias: Incidencia[];
  //vacation: Vacation;
  //vacacionesUsuario: Date[];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["usuario", "asunto", "mensaje", "estado"];
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private userService: UserService,
    private incidenciaService: IncidenciaService,
    private authService: AuthenticationService // private vacationService: VacationService
  ) {
    //this.incidencias= new Array<Incidencia>();
  }

  ngOnInit() {
    /*this.authService
      .getCurrentUser()
      .subscribe((user) => (this.usuarioLogueado = user));
    console.log('holaa');
    console.log(this.usuarioLogueado);
    this.vacationService.getVacationByUsername(this.usuarioLogueado._id).then(vac=> if(pending==undefined){}else{(this.vacation = vac)});
    console.log("hollaaa" + this.vacation.pending);
    this.vacacionesUsuario = this.vacation.pending;*/

    this.getIncidencias();
  }

  getIncidencias() {
    var incidenciaObs = this.incidenciaService.getIncidencias();
    console.log(incidenciaObs);
    incidenciaObs.subscribe(incidencias => {
      this.incidencias = incidencias;
      this.dataSource = new MatTableDataSource<Incidencia>(this.incidencias);
      this.dataSource.paginator = this.paginator;
    });
  }
}
