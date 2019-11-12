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
import { AuthenticationService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'


@Component({
  selector: 'app-modificar-ficha-admin',
  templateUrl: './modificar-ficha-admin.component.html',
  styleUrls: ['./modificar-ficha-admin.component.css'],
  providers: [DatePipe, DepartamentosService]
  
})

export class ModificarFichaAdminComponent implements OnInit {
  public user: User;
  users : User[];
  usuarios : User[];
  departamentos : Departamento[];
  public userForm: FormGroup;
  submitted = false;
  departamento : Departamento;
  
  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
  }    
  
  private onGetUserByName(res: any) {
    this.user = res;
  }

  getUsuarios(){
    var usuarioObs = this.userService.getUsers();
    usuarioObs.subscribe(users => this.users = users);

  }

  getDepartamentos(){  
    var departamentoObs = this.departamentosService.getDepartamentos();
    departamentoObs.subscribe(departamentos => this.departamentos = departamentos);

  }

  volver(){
    this.router.navigate(['/usuarios']);
  }

  guardarcambios(form) {
    //coger usuario logueado
    var usuarioMod = this.authService.getCurrentUser();
    usuarioMod.subscribe(user => (this.usuarioAModificar = user));
    //valores pasados por formulario si eres usuario
    if (
      this.usuarioAModificar.admin == false ||
      this.usuarioAModificar.gestor == false
    ) {
      this.usuarioAModificar.password = form.value.password;
      this.usuarioAModificar.domicilio = form.value.domicilio;
      this.usuarioAModificar.provincia = form.value.provincia;
      this.usuarioAModificar.localidad = form.value.localidad;
      this.usuarioAModificar.email = form.value.email;
      this.usuarioAModificar.telefono = form.value.telefono;
    } else {
      //valores pasados por formulario si eres admin
      this.usuarioAModificar.password = form.value.password;
      this.usuarioAModificar.domicilio = form.value.domicilio;
      this.usuarioAModificar.provincia = form.value.provincia;
      this.usuarioAModificar.localidad = form.value.localidad;
      this.usuarioAModificar.email = form.value.email;
      this.usuarioAModificar.telefono = form.value.telefono;
      this.usuarioAModificar.nombre = form.value.nombre;
      this.usuarioAModificar.apellidos = form.value.apellidos;
      this.usuarioAModificar.fechaNacimiento = form.value.fechaNacimiento;
      this.usuarioAModificar.username = form.value.username;
      this.usuarioAModificar.nuss = form.value.nuss;
    }



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



nombreBotonGestion = "Gestionar ficha personal";
Departamento = "RRHH"; 
Modo = "Modo administrador";
gestion = false;
cambiarModo(){
  if(this.Departamento == "RRHH"){
    this.Departamento = "Gestor";
  }else if(this.Departamento == "Gestor"){
    this.Departamento = "Empleado";
  }else{
    this.Departamento = "RRHH";
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
  return this.Departamento == "RRHH" || this.Departamento == "Gestor";
}

comprobarDepartamentoAdmin(){
  return this.Departamento == "RRHH";
}

comprobarGestionAdministrativa(){
  return this.gestion;
}

depart = "d";
us = "";
selected: Departamento; 
selected2: User; 
conseguido = "";
seleccionDepartamento(dep: Departamento){
  this.depart = dep.nombre;
  this.selected = dep;
  this.usuarios = dep.usuarios;
}

seleccionUsuario(us: User){
  this.depart = us.nombre;
  this.selected2 = us;
}




}
