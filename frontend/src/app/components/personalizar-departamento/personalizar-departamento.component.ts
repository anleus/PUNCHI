import { Component, OnInit } from "@angular/core";
import { Departamento } from "src/app/models/departamento";
import { DepartamentosService } from "../../services/departamentos.service";
import { UserService } from "../../services/user.service";
import { GestureConfig } from "@angular/material/core";
import { User } from "src/app/models/users";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-personalizar-departamento",
  templateUrl: "./personalizar-departamento.component.html",
  styleUrls: ["./personalizar-departamento.component.css"]
})
export class PersonalizarDepartamentoComponent implements OnInit {
  isEdit: Boolean;
  departamentoEditing: Departamento;
  departamentos: Departamento[];
  departamentoAlreadyExists: Boolean = false;
  nombre: string = "";
  responsable: User;
  allUsers: User[];
  selectedResponsable: string;

  // drag

  todo = [];

  done = [];

  constructor(
    private userService: UserService,
    private departamentosService: DepartamentosService,
    private UserService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (localStorage.getItem("editDepartamento") === "true") this.isEdit = true;
    this.getDepartamentos();

    this.UserService.getAllUsersObject().subscribe((res: User[]) => {
      this.allUsers = res.filter((v: User) => {
        return v.deleted == false;
      });
    });
    this.initDrag();
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

  isDuplicate() {
    if (!this.departamentos) return false;
    let duplicate = this.departamentos.filter(v => {
      return v.nombre === this.nombre;
    });
    if (!this.departamentoEditing) return false;
    if (this.isEdit && this.departamentoEditing.nombre === this.nombre) {
      this.departamentoAlreadyExists = false;
    } else {
      if (duplicate.length > 0) {
        //error departamento already exists
        this.departamentoAlreadyExists = true;
      } else {
        this.departamentoAlreadyExists = false;
      }
    }

    return this.departamentoAlreadyExists;
  }
  getDepartamentos() {
    var departamentoObs = this.departamentosService.getDepartamentos();
    console.log(departamentoObs);
    departamentoObs.subscribe(
      departamentos => (this.departamentos = departamentos)
    );
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

  guardarDepartamento() {
    //button guardar on click
    if (this.isDuplicate()) {
      //throw duplicate name error
      this.openErrorSnack("Nombre del departamento duplicado");
      return;
    }

    if (!this.isEdit) {
      this.departamentosService.crearDepartamento({
        nombre: this.nombre,
        users: this.done,
        responsable: this.responsable
      });
    } else {
      this.departamentosService.updateDepartamento({
        id: this.departamentoEditing._id,
        nombre: this.nombre,
        users: this.done,
        responsable: this.responsable
      });
    }
  }

  // drag

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  initDrag() {
    var users: string[];
    var idDep = localStorage.getItem("departamentoID");
    this.departamentosService
      .getDepartamentoByIDObject(idDep)
      .subscribe((Dep: Departamento) => {
        Dep.usuarios.forEach((element: any) => {
          this.userService.getUserById(element).subscribe((res: User) => {
            this.done.push(res.nombre);
            this.userService.getAllUsersObject().subscribe(res => {
              res.forEach(element => {
                if (!this.comprobarUserRepe(element.nombre, this.done)) {
                  this.todo.push(element.nombre);
                }
              });
            });
          });
        });
      });
  }

  comprobarUserRepe(user: string, listUser: string[]) {
    for (let index = 0; index < listUser.length; index++) {
      console.log("sdfsdfdsdds");
      console.log(user);
      console.log(listUser[index]);

      if (user == listUser[index]) return true;
    }

    return false;
  }
}
