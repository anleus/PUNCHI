import { Component, OnInit } from "@angular/core";
import { Departamento } from "src/app/models/departamento";
import { DepartamentosService } from "../../services/departamentos.service";
import { UserService } from "../../services/user.service";
import { GestureConfig } from "@angular/material/core";
import { User } from "src/app/models/users";
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
  nombre: string;
  responsable: User;
  allUsers: User[];
  selectedResponsable: string;

  // drag

  todo = [];

  subtodo = [];

  done = [];

  constructor(
    private userService: UserService,
    private departamentosService: DepartamentosService,
    private UserService: UserService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("editDepartamento") === "true") this.isEdit = true;

    this.UserService.getAllUsersObject().subscribe((res: User[]) => {
      this.allUsers = res;
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
    let duplicate = this.departamentos.filter(v => {
      return v.nombre === this.nombre;
    });
    if (duplicate.length > 0) {
      //error departamento already exists
      this.departamentoAlreadyExists = true;
    } else {
      this.departamentoAlreadyExists = false;
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

  guardarDepartamento() {
    //button guardar on click
  this.departamentosService.deleteDept(this.departamentoEditing._id)

  this.departamentoEditing.usuarios = this.done
  //this.departamentosService.postDepartamentos(this.departamentoEditing)
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
    let i = 0;
    var users: string[];
    var idDep = localStorage.getItem("departamentoID");
    this.departamentosService
      .getDepartamentoByIDObject(idDep)
      .subscribe((Dep: Departamento) => {
        Dep.usuarios.forEach((element: any) => {
          this.userService.getUserById(element).subscribe((res: User) => {
            this.done.push(res);
            
          });
        });
      });
      
      this.userService.getAllUsersObject().subscribe(res => {
        //res.forEach(element => {
          for (let index = 0; index < res.length; index++) {
           console.log(this.done.length)
          if (!this.comprobarUserRepe(res[index].nombre, this.done) ) {
            this.todo.push(res[index]);
          }
          
        }
        
       // });
      });   
  }

  comprobarUserRepe(user: string, listUser: User[]) {
    for (let index = 0; index < listUser.length; index++) {
      if (user == listUser[index].nombre) return true;
    }

    return false;
  }


}
