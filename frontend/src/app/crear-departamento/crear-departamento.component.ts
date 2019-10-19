import { Component, OnInit, NgModule } from "@angular/core";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { DepartamentosService } from "src/app/services/departamentos.service";

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
  constructor(private departamentosService: DepartamentosService) {}

  nombreDepartamento(event: any) {
    this.nombre = event.target.value;
  }

  crearDepartamento() {
    var departamento = {
      name: this.nombre
    };
    console.log(departamento);
    this.departamentosService.postDepartamentos(departamento);
  }
}
