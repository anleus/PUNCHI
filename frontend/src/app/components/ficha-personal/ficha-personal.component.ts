import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import { DatePipe } from '@angular/common';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-ficha-personal",
  templateUrl: "./ficha-personal.component.html",
  styleUrls: ["./ficha-personal.component.css"],
  providers: [DatePipe]
})
@NgModule({ imports: [ FormsModule]})
export class FichaPersonalComponent implements OnInit {
  //PASO3: crear un objeto user
  public user: User;
  public userForm: FormGroup;
  submitted = false;
  

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
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
    this.userForm.value.nombre=this.user.nombre;
    this.userForm.value.apellidos=this.user.apellidos;
    this.userForm.value.fechaNacimiento=this.user.fechaNacimiento;
    this.userForm.value.email=this.user.email;
    this.userForm.value.provincia=this.user.provincia;
    this.userForm.value.domicilio=this.user.domicilio;
    this.userForm.value.telefono=this.user.telefono;
    this.userForm.value.nuss=this.user.nuss;
    this.userForm.value.username=this.user.username;
    this.userForm.value.password=this.user.password;
    this.userForm.value.becario=this.user.becario;
    console.log(this.userForm);

    // stop here if form is invalid
     if(this.userForm.value.email==""||
     this.userForm.value.provincia==""||
     this.userForm.value.domicilio==""||
     this.userForm.value.telefono==""||
     this.userForm.value.contraseña=="") {
      return;
    }else{
      this.userService.putUser(this.user);
    }
    
   
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /**
   * Clase para obtener el departamento del usuario
   */
  obtenerDepartamento() {
    return "RRHH"; //Se debe sustituir por el acceso a la BD obteniendo el departamento del usuario loggeado
  }

  departamento = this.obtenerDepartamento();
  Modo = "Modo administrador";
  cambiarModo() {
    if (this.departamento == "RRHH") {
      this.departamento = "Gestor";
    } else if (this.departamento == "Gestor") {
      this.departamento = "Empleado";
    } else {
      this.departamento = "RRHH";
    }
  }

  comprobarDepartamento() {
    return this.departamento == "RRHH" || this.departamento == "Gestor";
  }

  comprobarDepartamentoAdmin() {
    return this.departamento == "RRHH";
  }
}
