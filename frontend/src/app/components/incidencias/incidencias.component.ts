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
import { VacationService } from "src/app/services/vacation.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { User } from "src/app/models/users";
import { Incidencia } from "../../models/incidencia";
import { IncidenciaService } from "src/app/services/incidencia.service";
import { element } from "protractor";
import { IgxCardThumbnailDirective, changei18n } from "igniteui-angular";
import { DepartamentosService } from "src/app/services/departamentos.service";

@Component({
  selector: "app-incidencias",
  templateUrl: "./incidencias.component.html",
  styleUrls: ["./incidencias.component.css"]
})
export class IncidenciasComponent implements OnInit {
  public usuarioLogueado = this.authService.getCurrentUser();
  public user: User;
  public userL: User;
  public userAux: User;
  incidencias: Incidencia[];
  incidenciasDeLosUsersDelGestor: Incidencia[];
  incidenciaAux = [];
  usuario =[];
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
    private departamentosService: DepartamentosService,
    private authService: AuthenticationService,
    private vacationservice: VacationService
  ) {
    //this.incidencias= new Array<Incidencia>();
  }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => (this.userL = user));
    if (
      this.usuarioLogueado.source["_value"].admin == false &&
      this.usuarioLogueado.source["_value"].gestor == false
    ) {
      this.getIncidenciaByUserId();
    } else if (this.usuarioLogueado.source["_value"].admin == true) {
      this.getIncidencias();
    } else if (this.usuarioLogueado.source["_value"].gestor == true) {
      this.getIncidenciaByGestor();
      //this.getIncidencias();
    }
  }

  getIncidencias() {
    var incidenciaObs = this.incidenciaService.getIncidencias();
    incidenciaObs.subscribe(incidencias => {
      var numberUsers = incidencias.length;
      var auxnumber = 0;
      this.incidencias = incidencias;
      this.incidencias.forEach(element => {
        this.userService.getUserById(element.id_user).subscribe(resp => {
          if (resp != null) {
            element.usuario = resp["username"];
          } else {
            element.usuario = "usuario no existente, ALERTA";
          }
          auxnumber++;
          if (auxnumber == numberUsers) {
            this.dataSource = new MatTableDataSource<Incidencia>(
              this.incidencias
            );
            this.dataSource.paginator = this.paginator;
          }
        });
      });
    });
  }

  getIncidenciaByUserId() {
    var incidenciaObs = this.incidenciaService.getIncidenciaByUserId(
      this.usuarioLogueado.source["_value"]._id
    );
    incidenciaObs.subscribe(incidencias => {
      this.incidencias = incidencias;
      this.incidencias.forEach((element, i) => {
        element.usuario = this.usuarioLogueado.source["_value"].username;
      });
      this.dataSource = new MatTableDataSource<Incidencia>(this.incidencias);
      this.dataSource.paginator = this.paginator;
    });
  }

  getIncidenciaByGestor() {
    this.departamentosService
      .getDepartamentoByGestor(this.usuarioLogueado.source["_value"]._id)
      .subscribe(res => {
        if (res != null) {
          var idsUsuarios = res["usuarios"];
          idsUsuarios.forEach(element => {
            this.userService.getUserById(element).subscribe(user => {
              var userAux = user;
              var aux;
              if (userAux["deleted"] == false) {
                var incidenciaObs = this.incidenciaService.getIncidenciaByUserId(
                  userAux["_id"]
                );
                incidenciaObs.subscribe(incidencias => {
                  aux = incidencias;
                  var anterior;
                  if(this.usuario.length == 0){
                    this.usuario.push(userAux["nombre"]);
                    anterior = userAux["nombre"];
                  }
                  else if(anterior != userAux["nombre"]){
                    this.usuario.pop();
                    this.usuario.push(userAux["nombre"]);
                  }
                  aux.forEach(inc => {
                    this.incidenciaAux.push(inc);
                  })
                  this.dataSource = new MatTableDataSource<Incidencia>(this.incidenciaAux);
                  this.dataSource.paginator = this.paginator;
                 
                });
              }
            });
          });
        }
      });
  }

  convertirIdToUsername(userId: string) {
    var aux;
    if (userId != undefined) {
      aux = this.userService.getUserById(userId);
      aux = aux.username;
    }
    return aux;
  }

  aceptarIncidencia(inc: Incidencia) {
    inc.estado = "aceptado";
    this.incidenciaService.putIncidencia(inc);

    var usuarioDestino = inc.id_user;
    this.vacationservice.getVacationByUsername(usuarioDestino).then(res => {
      if (res == null || typeof res == "undefined") {
        console.log("ALGO VA MAL!!!!!!");
      } else {
        var index = res.pending.indexOf(new Date(inc.mensaje).toISOString());
        res.pending.splice(index, 1);
        res.past.push(new Date(inc.mensaje).toISOString());
        this.vacationservice.updateVacation(
          res._id,
          res.pending,
          (res.left = res.vacationDaysLeft - 1), //hablar esto
          res.past
        );
      }
    });
  }

  denegarIncidencia(inc: Incidencia) {
    inc.estado = "denegado";
    this.incidenciaService.putIncidencia(inc);
    //TODO conexion base de datos
  }

  editarIncidencia(inc: Incidencia) {
    inc.estado = "pendiente";
    this.incidenciaService.putIncidencia(inc);
    //TODO conexion base de datos
  }

  esPendiente(inc: Incidencia) {
    return inc.estado == "pendiente";
  }
  esAdmin() {
    return this.userL.admin || this.userL.gestor;
  }

  getDayFromIncidencia(inc: Incidencia) {
    return inc.mensaje.slice(5);
  }

  pad2(num) {
    return num < 10 ? "0" + num : num;
  }

  getDayFromDate(date: Date) {
    date = new Date(date);
    return (
      this.pad2(date.getDate()) +
      "/" +
      this.pad2(date.getMonth()) +
      "/" +
      this.pad2(date.getFullYear())
    );
  }

  getDC() {
    this.authService.getCurrentUser().subscribe(user => (this.userL = user));
    if (this.esAdmin()) {
      return ["usuario", "asunto", "mensaje", "estado", "select"];
    } else {
      return ["usuario", "asunto", "mensaje", "estado"];
    }
  }
}
