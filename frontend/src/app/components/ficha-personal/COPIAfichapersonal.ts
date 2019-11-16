import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import { DatePipe } from "@angular/common";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { DepartamentosService } from "src/app/services/departamentos.service";
import { Departamento } from "src/app/models/departamento";
import { AuthenticationService } from "src/app/services/auth.service";

@Component({
  selector: "app-ficha-personal",
  templateUrl: "./ficha-personal.component.html",
  styleUrls: ["./ficha-personal.component.css"],
  providers: [DatePipe, DepartamentosService]
})
@NgModule({ imports: [FormsModule] })
export class FichaPersonalComponent implements OnInit {
  //PASO3: crear un objeto user
  public user: User;
  users: User[];
  departamentos: Departamento[];
  public userForm: FormGroup;
  submitted = false;
  gestion = true;
  selectedDepartamento: Departamento;
  selectedUsuario: User;
  logUser: User;
  error = "";
  fecha="";

  public userV : User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private departamentosService: DepartamentosService,
    private authService: AuthenticationService
  ) {
    this.user = new User();
    this.userV = new User();
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
    this.getUsuarioRegistrado();
  }

  onSubmit() {

    
      var usuarioAct = this.authService.getCurrentUser();
      usuarioAct.subscribe(user => this.logUser = user);
      if(this.user.username == this.logUser.username && !this.logUser.admin){
        this.error = "No puedes modificarte a ti mismo.";
       
        return;
      }

  }

  get f() {
    return this.userForm.controls;
  }

  getUsuarios() {
    var usuarioObs = this.userService.getUsers();
    usuarioObs.subscribe(users => (this.users = users));
  }
  prueba = "";
  getUsuarioRegistrado() {
    var usuarioAct = this.authService.getCurrentUser();
    usuarioAct.subscribe(user => (this.user = user));
    this.prueba = this.user.nombre;
  }
  getDepartamentos() {
    var departamentoObs = this.departamentosService.getDepartamentos();
    departamentoObs.subscribe(
      departamentos => (this.departamentos = departamentos)
    );
  }

  nombreBotonGestion = "Gestionar empleados";
  dep = "RRHH";
  comprobarDepartamento() {
    return (this.user.admin || this.user.gestor);
    //return this.user.admin; // A esta línea no s'arriba mai
  }

  comprobarDepartamentoAdmin() {
    return this.user.admin;
   
  }
  dnombre = "";
  seleccionDepartamento(dep: Departamento) {
    this.selectedDepartamento = dep;
    //this.users = dep.usuarios;
    this.dnombre = dep.nombre;
  }

  unombre = "";
  usuarioN: User;
  seleccionUsuario(us: User) {
    this.user = us;
    this.unombre = us.nombre;
  }

  cambiarModoGestion() {
    if (this.gestion) {
      this.gestion = false;
      this.nombreBotonGestion = "Gestionar ficha personal";
      this.notificacion="";
    } else {
      this.gestion = true;
      this.nombreBotonGestion = "Gestionar empleados";
      this.notificacion="";
    }
  }

  departamentosP: Departamento[];
  usersP: User[];
  departamentoSol: Departamento;
  prueba2 = "";
  getUsuarioByDepartamento(us: User) {
    var departamentoObs = this.departamentosService.getDepartamentos();
    departamentoObs.subscribe(res => (this.departamentosP = res));

    for (let departamento of this.departamentosP) {
      this.usersP = departamento.usuarios;
      for (let user of this.usersP) {
        if (us == user) {
          this.departamentoSol = departamento;
          this.prueba2 = departamento.nombre;
        }
      }
    }
  }


  notificacion = "";
  guardarCambios2(password,domicilio,provincia,nombre,apellidos,fechaNacimiento,nuss,username,email,localidad) {
    if (
      typeof password == "undefined" ||
      typeof domicilio == "undefined" ||
      typeof provincia == "undefined" ||
      typeof nombre == "undefined" ||
      typeof apellidos == "undefined" ||
      typeof fechaNacimiento == "undefined" ||
      typeof nuss == "undefined" ||
      typeof username == "undefined" ||
      typeof email == "undefined" ||
      typeof localidad == "undefined"
    ) {
      this.notificacion = "";
      if (typeof password == "undefined") {
        console.log("El campo password no es correcto");
        this.notificacion = "El campo password no es correcto \\\n "+ this.notificacion;
      }
      if (typeof domicilio == "undefined" ) {
          console.log("El campo domicilio no es correcto");
          this.notificacion = "El campo domicilio no es correcto \\\n " + this.notificacion ;
      }
      if (typeof provincia == "undefined") {
          console.log("El campo provincia no es correcto");
          this.notificacion ="El campo provincia no es correcto \\\n " + this.notificacion;
      }
      if (typeof apellidos == "undefined") {
        console.log("El campo apellido no es correcto");
        this.notificacion ="El campo apellido no es correcto \\\n " + this.notificacion;
      }
      if (typeof fechaNacimiento == "undefined") {
        console.log("La fecha de nacimiento no es correcta");
        this.notificacion ="El campo fecha de nacimiento no es correcto \\\n " + this.notificacion;
      }
      if (typeof nuss == "undefined") {
        console.log("El campo nuss no es correcto");
        this.notificacion ="El campo nuss no es correcto \\\n " + this.notificacion;
      }
      if (typeof username == "undefined") {
        console.log("El campo username no es correcto");
        this.notificacion ="El campo username no es correcto \\\n " + this.notificacion;
      }
      if (typeof email == "undefined") {
        console.log("El campo email no es correcto");
        this.notificacion ="El campo email no es correcto \\\n " + this.notificacion;
      }
      if (typeof localidad == "undefined") {
        console.log("El campo localidad no es correcto");
        this.notificacion ="El campo localidad no es correcto \\\n " + this.notificacion;
      }
      if (typeof nombre == "undefined") {
        console.log("El campo nombre no es correcto");
        this.notificacion ="El campo nombre no es correcto \\\n " + this.notificacion;
      }
     
    }
     else {
      console.log("El campo es correcto.");
      this.userService.putUser(this.user);
    }
  }




  guardarCambios1(password,domicilio,provincia,localidad) {
    
    
    if (
      typeof password == "undefined" ||
      typeof domicilio == "undefined" ||
      typeof provincia == "undefined" ||
      typeof localidad == "undefined"
    ) {
      this.notificacion = "";
      if (typeof password == "undefined") {
        console.log("El campo password no es correcto");
        this.notificacion = "El campo password no es correcto \\\n "+ this.notificacion;
      }
      if (typeof domicilio == "undefined") {
          console.log("El campo domicilio no es correcto");
          this.notificacion = "El campo domicilio no es correcto \\\n " + this.notificacion ;
      }
      if (typeof provincia == "undefined") {
          console.log("El campo provincia no es correcto");
          this.notificacion ="El campo provincia no es correcto \\\n " + this.notificacion;
      }
      if (typeof localidad == "undefined") {
        console.log("El campo localidad no es correcto");
        this.notificacion ="El campo localidad no es correcto \\\n " + this.notificacion;
      }
    }
    else {
      

        this.userV.password=password;
        this.userV.domicilio=domicilio;
        this.userV.provincia=provincia;
        this.userV.localidad=localidad;
        //this.userV.telefono=telefono;

        this.userV.nombre=this.user.nombre;
        this.userV.apellidos=this.user.apellidos;
        this.userV.fechaNacimiento=this.user.fechaNacimiento;
        this.userV._id=this.user._id;
        this.userV.email=this.user.email;
        this.userV.gestor=this.user.gestor;
        this.userV.nuss=this.user.nuss;
        this.userV.admin=this.user.admin;
        this.userV.becario=this.user.becario;
        this.userV.deleted=this.user.deleted;
        this.userV.telefono=this.user.telefono;

        console.log(password,domicilio,provincia,localidad)
        console.log(this.userV);
     console.log("El campo es correcto.");
     this.userService.putUser(this.userV);
   }
  }
}
