import { Component, OnInit, NgModule } from "@angular/core";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { DepartamentosService } from "src/app/services/departamentos.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Departamento } from "src/app/models/departamento";

@Component({
  selector: "app-crear-departamento",
  templateUrl: "./crear-departamento.component.html",
  styleUrls: ["./crear-departamento.component.css"],
  providers: [DepartamentosService]
})
@NgModule({
  imports: [HttpClient, HttpClientModule, HttpHeaders],
  providers: [DepartamentosService]
})
export class CrearDepartamentoComponent implements OnInit {
  nombre = "";
  departamentos: Departamento[];
  departamentoAlreadyExists: Boolean;

  ngOnInit() {
    this.getDepartamentos();
  }
  constructor(
    private departamentosService: DepartamentosService,
    private snackBar: MatSnackBar
  ) {}

  nombreDepartamento(event: any) {
    this.nombre = event.target.value;
    let duplicate = this.departamentos.filter(v => {
      return v.nombre === this.nombre;
    });
    if (duplicate.length > 0) {
      //error departamento already exists
      this.departamentoAlreadyExists = true;
    } else {
      this.departamentoAlreadyExists = false;
    }
  }
  getDepartamentos() {
    var departamentoObs = this.departamentosService.getDepartamentos();
    console.log(departamentoObs);
    departamentoObs.subscribe(
      departamentos => (this.departamentos = departamentos)
    );
  }

  crearDepartamento() {
    if (this.departamentoAlreadyExists) {
      this.openErrorSnack(
        "Este departamento ya existe, por favor usa otro nombre"
      );
    } else {
      var departamento = {
        nombre: this.nombre
      };
      this.departamentosService.postDepartamentos(departamento).then(res => {
        this.snackSuccess("Se ha creado el departamento correctamente");
      });
    }
  }
  openErrorSnack(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Ha ocurrido un error. Inténtalo de nuevo",
      duration: 3 * 1000,
      panelClass: ["alert-red"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  snackSuccess(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Departamento creado correctamente",

      duration: 3 * 1000,

      panelClass: ["success-red"],

      horizontalPosition: "right",

      verticalPosition: "top"
    });
  }
}
