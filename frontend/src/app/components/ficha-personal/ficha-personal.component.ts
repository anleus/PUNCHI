import { Component, OnInit, NgModule } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
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
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-ficha-personal",
  templateUrl: "./ficha-personal.component.html",
  styleUrls: ["./ficha-personal.component.css"],
  providers: [DatePipe, DepartamentosService]
})
@NgModule({ imports: [FormsModule] })
export class FichaPersonalComponent implements OnInit {
  //utilizado
  usuarioLogueado: User;
  public userForm: FormGroup;
  public userV: User;
  usuarioform: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.userV = new User();
    
  }

  ngOnInit() {
    var usuarioAct = this.authService.getCurrentUser();
    usuarioAct.subscribe(user => this.usuarioLogueado = user);

    this.usuarioform = new FormGroup({
      nombre: new FormControl(this.usuarioLogueado.nombre),
      apellidos: new FormControl(this.usuarioLogueado.apellidos),
      fechaNacimiento: new FormControl(this.usuarioLogueado.fechaNacimiento, [Validators.required]),
      email: new FormControl(this.usuarioLogueado.email, [Validators.required, Validators.email]),
      nuss: new FormControl(this.usuarioLogueado.nuss, [Validators.required]),
      telefono: new FormControl(this.usuarioLogueado.telefono, [Validators.required]),
      username: new FormControl(this.usuarioLogueado.username, [Validators.required]),
      password: new FormControl(this.usuarioLogueado.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      localidad: new FormControl(this.usuarioLogueado.localidad, [Validators.required]),
      provincia: new FormControl(this.usuarioLogueado.provincia, [Validators.required]),
      domicilio: new FormControl(this.usuarioLogueado.domicilio, [Validators.required])
    });


  }

  
  //inicialización formulario
  

  guardarcambios(form) {
    //coger usuario logueado
    var usuarioAct = this.authService.getCurrentUser();
    usuarioAct.subscribe(user => this.usuarioLogueado = user);
    //valores pasados por formulario
    this.usuarioLogueado.password = form.value.password;
    this.usuarioLogueado.domicilio = form.value.domicilio;
    this.usuarioLogueado.provincia = form.value.provincia;
    this.usuarioLogueado.localidad = form.value.localidad
    this.usuarioLogueado.nombre = form.value.nombre;
    this.usuarioLogueado.apellidos = form.value.apellidos;
    this.usuarioLogueado.fechaNacimiento = form.value.fechaNacimiento;
    this.usuarioLogueado.email = form.value.email;
    this.usuarioLogueado.nuss = form.value.nuss;
    this.usuarioLogueado.telefono = form.value.telefono;

    if (form.status == "VALID") {
      this.userService.putUser(this.usuarioLogueado);
      this.snackSuccess("Usuario modificado correctamente");
    }
    else {
      this.snackError("No puedes modificar datos que no son del usuario logueado");
    }
  }

  snackError(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Ha ocurrido un error. Inténtalo de nuevo",
      duration: 3 * 1000,
      panelClass: ["alert-red"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  snackSuccess(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Usuario guardado correctamente",
      duration: 3 * 1000,
      panelClass: ["success-red"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
