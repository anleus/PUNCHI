import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import { DatePipe } from "@angular/common";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { Departamento } from "src/app/models/departamento";
import { DepartamentosService } from "src/app/services/departamentos.service";
import { MatSnackBar } from "@angular/material/snack-bar";
//import { userInfo } from 'os';

@Component({
  selector: "app-asignar-dep",
  templateUrl: "./asignar-dep.component.html",
  styleUrls: ["./asignar-dep.component.css"],
  providers: [DatePipe]
})
export class AsignarDepComponent implements OnInit {
  public user: User;
  users: User[];
  public userForm: FormGroup;
  submitted = false;
  selectUser: Number;
  departamentos: Departamento[];
  Departamento: Departamento;
  selected: User;
  selected2: Departamento;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private departamentosService: DepartamentosService,
    private snackBar: MatSnackBar
  ) {
    this.user = new User();
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ["", Validators.required],
      telefono: ["", Validators.required],
      domicilio: ["", Validators.required],
      password: ["", Validators.required],
      provincia: ["", Validators.required]
    });
    this.getUsuarios();
    this.getDepartamentos();
  }

  getUsuarios() {
    var usuarioObs = this.userService.getUsers();
    usuarioObs.subscribe(users => (this.users = users));
  }

  getDepartamentos() {
    var departamentoObs = this.departamentosService.getDepartamentos();
    departamentoObs.subscribe(
      departamentos => (this.departamentos = departamentos)
    );
  }
  selectionChange(event: any) {
    this.selectUser = event.value;
    console.log(this.selectUser);
  }

  //Click on asignar method
  asignarDepartamento() {
    if (!this.comprobarUserRepe(this.selected, this.selected2.usuarios)) {
      if (
        this.selected2.usuarios === null ||
        this.selected2.usuarios === undefined ||
        this.selected2.usuarios === []
      ) {
        this.selected2.usuarios = [this.selected];
      } else {
        this.selected2.usuarios.push(this.selected);
      }
      this.departamentosService.deleteDept(this.selectedDepID).subscribe();
      this.departamentosService.crearDepartamento(this.selected2);
    } else {
      this.openSnack("Este usuario ya se encuentra en el departamento");
    }
  }
  selectedDep = "";
  selectedDepID = "";
  selectedUs = "";
  seleccionDepartamento(dep: Departamento) {
    this.selected2 = dep;
    this.selectedDep = dep.nombre;
    this.selectedDepID = dep._id;
  }

  seleccionUsuario(us: User) {
    this.selected = us;
    this.selectedUs = us.nombre;
  }

  comprobarUserRepe(usr: User, userCol: User[]) {
    for (let i in userCol) {
      if (userCol[i].toString().includes(usr._id)) return true;
    }
    return false;
  }

  openSnack(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Error",
      duration: 2000,
      panelClass: ["alert-red"],
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}
