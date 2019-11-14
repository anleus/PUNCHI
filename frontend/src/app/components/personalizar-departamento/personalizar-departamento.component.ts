import { Component, OnInit } from "@angular/core";
import { Departamento } from "src/app/models/departamento";
import { DepartamentosService } from "../../services/departamentos.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-personalizar-departamento",
  templateUrl: "./personalizar-departamento.component.html",
  styleUrls: ["./personalizar-departamento.component.css"]
})
export class PersonalizarDepartamentoComponent implements OnInit {
  isEdit: Boolean;
  departamento: Departamento;

  constructor(private departamentosService: DepartamentosService) {
    if (localStorage.getItem("editDepartamento") === "true") this.isEdit = true;
    if (this.isEdit) {
      var depID = localStorage.getItem("departamentoID");
      let dep = this.departamentosService;
    }
  }

  ngOnInit() {}
}
