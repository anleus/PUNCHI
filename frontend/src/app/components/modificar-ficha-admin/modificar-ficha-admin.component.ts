import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { DepartamentosService } from "src/app/services/departamentos.service";
import { Departamento } from "src/app/models/departamento";
import { DatePipe } from '@angular/common';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-modificar-ficha-admin',
  templateUrl: './modificar-ficha-admin.component.html',
  styleUrls: ['./modificar-ficha-admin.component.css'],
  providers: [DatePipe, DepartamentosService]
  
})

@NgModule({
  imports: [HttpClient, HttpClientModule, HttpHeaders],
  providers: [DepartamentosService]
})

export class ModificarFichaAdminComponent implements OnInit {
  public user: User;
  users : User[];
  departamentos : Departamento[];
  public userForm: FormGroup;
  submitted = false;
  
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private departamentosService: DepartamentosService
  ) {
    //PASO 1: llamar al service que sea necesario
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
    //PASO2: llamar a userservice y getuserbyid
    //this.userService
      //.getUserByUsername("root")
      //.then(this.onGetUserByName.bind(this.user));
  }    
  
  private onGetUserByName(res: any) {
    this.user = res;
  }

  getUsuarios(){
    /*this.userService.getUsuarios()
    .subscribe(res =>
      this.userService.getUsuarios = res as User[];
      console.log(res);
      )
    */
   var usuarioObs = this.userService.getUsers();
   usuarioObs.subscribe(users => this.users = users)

  }

  /*getDepartamentos(){
    this.userService.getUsuarios()
    .subscribe(res =>
      this.userService.getUsuarios = res as User[];
      console.log(res);
      )
    
   var departamentoObs = this.departamentosService.getDepartamentos()
   departamentoObs.subscribe(this.departamentos => this.departamentos = departamentos)

  }*/



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    
    this.userService.putUser(this.user);
  }

    // convenience getter for easy access to form fields
    get f() { return this.userForm.controls; }

 /**
 * Clase para obtener el departamento del usuario
 */
obtenerDepartamento(){
  return "RRHH";  //Se debe sustituir por el acceso a la BD obteniendo el departamento del usuario loggeado
}

nombreBotonGestion = "Gestionar ficha personal";
departamento = this.obtenerDepartamento(); 
Modo = "Modo administrador";
gestion = false;
cambiarModo(){
  if(this.departamento == "RRHH"){
    this.departamento = "Gestor";
  }else if(this.departamento == "Gestor"){
    this.departamento = "Empleado";
  }else{
    this.departamento = "RRHH";
  }
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

comprobarDepartamento(){
  return this.departamento == "RRHH" || this.departamento == "Gestor";
}

comprobarDepartamentoAdmin(){
  return this.departamento == "RRHH";
}

comprobarGestionAdministrativa(){
  return this.gestion;
}
}
