import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import { DatePipe } from '@angular/common';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { DepartamentosService } from "src/app/services/departamentos.service";
import { Departamento } from "src/app/models/departamento";

@Component({
  selector: "app-ficha-personal",
  templateUrl: "./ficha-personal.component.html",
  styleUrls: ["./ficha-personal.component.css"],
  providers: [DatePipe,DepartamentosService]
})

@NgModule({ imports: [ FormsModule]})
export class FichaPersonalComponent implements OnInit {
  //PASO3: crear un objeto user
  public user: User;
  users : User[];
  departamentos : Departamento[];
  public userForm: FormGroup;
  submitted = false;
  gestion = true;
  selectedDepartamento: Departamento; 
  selectedUsuario: User; 

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private departamentosService: DepartamentosService
  ) {

    this.user = new User();
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required],
      password: ['', Validators.required],
      provincia: ['', Validators.required]
    });
    this.getUsuarios();
    this.getDepartamentos();
    this.userService
      .getUserByUsernameDOS("root")
      .subscribe(this.onGetUserByName.bind(this));
      console.log(this.user.becario);
 
  }

  private onGetUserByName(res: any) {
    this.user = res;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.userForm);
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    console.log(this.user);
    this.userService.putUser(this.user);
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  getUsuarios(){
    var usuarioObs = this.userService.getUsers();
    usuarioObs.subscribe(users => this.users = users);
  }

  getDepartamentos(){  
    var departamentoObs = this.departamentosService.getDepartamentos();
    departamentoObs.subscribe(departamentos => this.departamentos = departamentos);
  }
  
  nombreBotonGestion = "Gestionar ficha personal";
  dep = "RRHH";
  comprobarDepartamento() {
    return this.dep == "RRHH";
    //return (this.user.departamento.nombre == "RRHH" || this.user.departamento.responsable == this.user); //Cuando funcione users
  }

 
  comprobarDepartamentoAdmin() {
    return this.dep == "RRHH";
    //return (this.user.departamento.nombre == "RRHH"|| this.dep == "RRHH");
   
  }
  dnombre = "";
  seleccionDepartamento(dep: Departamento){
    this.selectedDepartamento = dep;
    this.users = dep.usuarios;
    this.dnombre = dep.nombre;
  }

  unombre = "";
  seleccionUsuario(us: User){
    this.selectedUsuario = us;
    this.unombre = us.nombre;
  }


  cambiarModoGestion(){
    if(this.gestion){
      this.gestion = false;
      this.nombreBotonGestion = "Gestionar ficha personal";
    }else{
      this.gestion = true;
      this.nombreBotonGestion = "Gestionar empleados";
    }
  }

}
