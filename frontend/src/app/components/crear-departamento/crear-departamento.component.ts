import { Component, OnInit, NgModule } from "@angular/core";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { DepartamentosService } from "src/app/services/departamentos.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  ngOnInit() {}
  constructor(
    private departamentosService: DepartamentosService,
    private snackBar: MatSnackBar
  ) {}

  nombreDepartamento(event: any) {
    this.nombre = event.target.value;
  }

  crearDepartamento() {
    var departamento = {
      nombre: this.nombre
    };
    this.departamentosService.postDepartamentos(departamento).then(res => {
      this.openSnack("Se ha creado el departamento correctamente");
    });
  }
  openSnack(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Ha ocurrido un error. Inténtalo de nuevo",
      duration: 6 * 1000,
      panelClass: "center", //No funciona, no sé por qué
      horizontalPosition: "left",
      verticalPosition: "bottom"
    });
  }
}
