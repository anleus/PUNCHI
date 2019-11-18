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
import { VacationService } from 'src/app/services/vacation.service';
import { AuthenticationService } from "src/app/services/auth.service";
import { User } from "src/app/models/users";
import Incidencia from "src/app/models/incidencia";
import { IncidenciaService } from "src/app/services/incidencia.service";
import { element } from 'protractor';
import { IgxCardThumbnailDirective, changei18n } from 'igniteui-angular';

@Component({
  selector: "app-incidencias",
  templateUrl: "./incidencias.component.html",
  styleUrls: ["./incidencias.component.css"]
})
export class IncidenciasComponent implements OnInit {
  public usuarioLogueado = this.authService.getCurrentUser();
  public user: User;
  public userL: User;
  incidencias: Incidencia[];
  //vacation: Vacation;
  //vacacionesUsuario: Date[];

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = this.getDC();
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private userService: UserService,
    private incidenciaService: IncidenciaService,
    private authService: AuthenticationService, // private vacationService: VacationService
    private vacationService: VacationService
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
    this.authService.getCurrentUser().subscribe((user) => (this.userL = user));
    if (this.usuarioLogueado.source["_value"].admin == false && this.usuarioLogueado.source["_value"].gestor == false) {
      this.getIncidenciaByUserId();
    } else {
      this.getIncidencias();
    }
  }

  getIncidencias() {
    var incidenciaObs = this.incidenciaService.getIncidencias();
    incidenciaObs.subscribe(incidencias => {
      var numberUsers = incidencias.length;
      var auxnumber = 0;
      this.incidencias = incidencias;
      this.incidencias.forEach(element => {
        this.userService.getUserById(element.id_user).subscribe(
          resp => {
            if (resp != null) {
              element.usuario = resp["username"];
            }
            else { element.usuario = "usuario no existente, ALERTA"; }
            auxnumber++;
            if (auxnumber == numberUsers) {
              this.dataSource = new MatTableDataSource<Incidencia>(this.incidencias);
              this.dataSource.paginator = this.paginator;
            }
          });
      });
    });
  }

  getIncidenciaByUserId() {
    var incidenciaObs = this.incidenciaService.getIncidenciaByUserId(this.usuarioLogueado.source["_value"]._id);
    incidenciaObs.subscribe(incidencias => {
      this.incidencias = incidencias;
      this.incidencias.forEach((element, i) => {
        element.usuario = this.usuarioLogueado.source["_value"].username;
      });
      this.dataSource = new MatTableDataSource<Incidencia>(this.incidencias);
      this.dataSource.paginator = this.paginator;
    });
  }

  aceptarIncidencia(inc: Incidencia) {
    inc.estado = "aceptado";
    this.incidenciaService.putIncidencia(inc);
    let incDate = this.getDayFromIncidencia(inc);
    console.log('hola');
    console.log(inc.id_user);
    this.vacationService.getVacationByUsername(inc.id_user).then((userVacations) => {
      userVacations.left--;
      userVacations.pending.filter((date) => this.getDayFromDate(date) != incDate)
      userVacations.past.push(new Date(incDate));
      this.vacationService.putVacationUser(userVacations._id, userVacations);
    }).catch((err) => console.log(err));
  }

  getDayFromIncidencia(inc: Incidencia) {
    return inc.mensaje.slice(5);
  }

  pad2(num) {
    return num < 10 ? '0' + num : num;
  }

  getDayFromDate(date: Date) {
    return this.pad2(date.getDay()) + '/' + this.pad2(date.getMonth()) + '/' + this.pad2(date.getFullYear())
  }
  denegarIncidencia(inc: Incidencia) {
    inc.estado = "denegado";
    this.incidenciaService.putIncidencia(inc);
    console.log(inc.estado);
  }

  esPendiente(inc: Incidencia) {
    return inc.estado == "pendiente";
  }
  esAdmin() {
    return this.userL.admin;
  }

  getDC() {
    this.authService.getCurrentUser().subscribe((user) => (this.userL = user));
    if (this.userL.admin) {
      return ["usuario", "asunto", "mensaje", "estado", "select"];
    } else {
      return ["usuario", "asunto", "mensaje", "estado"];
    }
  }


}
