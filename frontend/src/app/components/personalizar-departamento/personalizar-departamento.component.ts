import { Component, OnInit } from "@angular/core";
import { Departamento } from "src/app/models/departamento";
import { DepartamentosService } from "../../services/departamentos.service";
import { UserService } from "../../services/user.service";
import { GestureConfig } from "@angular/material/core";
import { User } from "src/app/models/users";

@Component({
  selector: "app-personalizar-departamento",
  templateUrl: "./personalizar-departamento.component.html",
  styleUrls: ["./personalizar-departamento.component.css"]
})
export class PersonalizarDepartamentoComponent implements OnInit {
  isEdit: Boolean;
  departamentoEditing: Departamento;
  departamentos: Departamento[];
  departamentoAlreadyExists: Boolean;
  nombre: string;
  responsable: User;
  allUsers: User[];
  selectedResponsable: string;

  constructor(
    private departamentosService: DepartamentosService,
    private UserService: UserService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("editDepartamento") === "true") this.isEdit = true;

    this.UserService.getAllUsersObject().subscribe((res: User[]) => {
      this.allUsers = res;
    });

    if (this.isEdit) {
      //edit departamento
      var depID = localStorage.getItem("departamentoID");
      this.departamentosService
        .getDepartamentoByIDObject(depID)
        .subscribe((res: Departamento) => {
          this.departamentoEditing = res;
          this.nombre = res.nombre;

          let temp: any = res.responsable;
          this.selectedResponsable = temp;
        });
    } else {
      //new departamento
      this.nombre = "";
      this.selectedResponsable = "";
    }
  }
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

  guardarDepartamento() {
    //button guardar on click
  }
}
