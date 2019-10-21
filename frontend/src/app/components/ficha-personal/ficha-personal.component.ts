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
import { AuthenticationService } from 'src/app/services/auth.service';

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
    private departamentosService: DepartamentosService,
    private authService: AuthenticationService
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
    this.getUsuarioRegistrado();
    /*this.userService
      .getUserByUsernameDOS("root")
      .subscribe(this.onGetUserByName.bind(this));
      console.log(this.user.becario);*/
  }

  private onGetUserByName(res: any) {
    this.user = res;
  }

  onSubmit() {
   this.user.email=this.userForm.value.email;
   this.user.domicilio=this.userForm.value.domicilio;
   this.user.provincia=this.userForm.value.provincia;
   this.user.telefono=this.userForm.value.telefono;
   this.user.password=this.userForm.value.password;

    //this.user.password=this.userForm.value.password;
    

    // stop here if form is invalid
     if(this.userForm.invalid) {
      return;
    }else{
      console.log(this.userForm);
      console.log(this.user);
      this.userService.putUser(this.user);
    }
    
   
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  getUsuarios(){
    var usuarioObs = this.userService.getUsers();
    usuarioObs.subscribe(users => this.users = users);
  }
  prueba="";
  getUsuarioRegistrado(){
    var usuarioAct = this.authService.getCurrentUser();
    usuarioAct.subscribe(user => this.user = user);
    this.prueba = this.user.nombre;
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
    //this.users = dep.usuarios;
    this.dnombre = dep.nombre;
  }

  unombre = "";
  usuarioN : User;
  seleccionUsuario(us: User){
    this.user = us;
    this.unombre = us.nombre;
    console.log(this.user);
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


  departamentosP : Departamento[];
  usersP : User[];
  departamentoSol : Departamento;
  prueba2 = "";
  getUsuarioByDepartamento(us:User){
    var departamentoObs = this.departamentosService.getDepartamentos();
    departamentoObs.subscribe(res => this.departamentosP = res);

    for(let departamento of this.departamentosP){
      this.usersP = departamento.usuarios;
      for(let user of this.usersP){
        if(us == user){
          this.departamentoSol = departamento;
          this.prueba2 = departamento.nombre;
        }
      }
    }

  }

notificacion = "";
  guardarCambios(password){
    if(typeof password == 'undefined'){
      console.log("El campo password no es correcto");
      this.notificacion = "El campo password no es correcto";
    }else{
      console.log("El campo es correcto.")
      this.userService.putUser(this.user);
    }
  }

}
