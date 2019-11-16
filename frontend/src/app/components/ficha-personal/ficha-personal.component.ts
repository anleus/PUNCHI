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
  usuarioLogueado: User;
  usuarioSinModificar: User;
  public userForm: FormGroup;
  public userV: User;
  usuarioform: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //guardar copia usuario sin modificar
    this.usuarioSinModificar = this.usuarioLogueado;

    //usuario logueado
    var usuarioAct = this.authService.getCurrentUser();
    usuarioAct.subscribe(user => (this.usuarioLogueado = user));

    //patrón email
    var emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

    this.usuarioform = new FormGroup({
      nombre: new FormControl(this.usuarioLogueado.nombre, [
        Validators.required
      ]),
      apellidos: new FormControl(this.usuarioLogueado.apellidos, [
        Validators.required
      ]),
      fechaNacimiento: new FormControl(this.usuarioLogueado.fechaNacimiento, [
        Validators.required
      ]),
      email: new FormControl(this.usuarioLogueado.email, [
        Validators.required,
        Validators.pattern(emailPattern)
      ]),
      nuss: new FormControl(this.usuarioLogueado.nuss, [Validators.required]),
      telefono: new FormControl(this.usuarioLogueado.telefono, [
        Validators.required,
        Validators.minLength(8)
      ]),
      username: new FormControl(this.usuarioLogueado.username, [
        Validators.required
      ]),
      password: new FormControl(this.usuarioLogueado.password, [
        Validators.required,
        Validators.minLength(4)
      ]),
      localidad: new FormControl(this.usuarioLogueado.localidad, [
        Validators.required,
        Validators.pattern("^[a-zA-Z -']+")
      ]),
      provincia: new FormControl(this.usuarioLogueado.provincia, [
        Validators.required,
        Validators.pattern("^[a-zA-Z -']+")
      ]),
      domicilio: new FormControl(this.usuarioLogueado.domicilio, [
        Validators.required
      ])
    });

    //si eres usuario NORMAL deshabilitamos la modificación de algunos campos
    if (
      this.usuarioLogueado.gestor == false &&
      this.usuarioLogueado.admin == false
    ) {
      this.usuarioform.controls["nombre"].disable();
      this.usuarioform.controls["apellidos"].disable();
      this.usuarioform.controls["fechaNacimiento"].disable();
      this.usuarioform.controls["username"].disable();
      this.usuarioform.controls["nuss"].disable();
    }
  }

  guardarcambios(form) {
    //coger usuario logueado
    var usuarioAct = this.authService.getCurrentUser();
    usuarioAct.subscribe(user => (this.usuarioLogueado = user));
    //valores pasados por formulario si eres usuario
    if (
      this.usuarioLogueado.admin == false &&
      this.usuarioLogueado.gestor == false
    ) {
      this.usuarioLogueado.password = form.value.password;
      this.usuarioLogueado.domicilio = form.value.domicilio;
      this.usuarioLogueado.provincia = form.value.provincia;
      this.usuarioLogueado.localidad = form.value.localidad;
      this.usuarioLogueado.email = form.value.email;
      this.usuarioLogueado.telefono = form.value.telefono;
    } else {
      //valores pasados por formulario si eres admin
      this.usuarioLogueado.password = form.value.password;
      this.usuarioLogueado.domicilio = form.value.domicilio;
      this.usuarioLogueado.provincia = form.value.provincia;
      this.usuarioLogueado.localidad = form.value.localidad;
      this.usuarioLogueado.email = form.value.email;
      this.usuarioLogueado.telefono = form.value.telefono;
      this.usuarioLogueado.nombre = form.value.nombre;
      this.usuarioLogueado.apellidos = form.value.apellidos;
      this.usuarioLogueado.fechaNacimiento = form.value.fechaNacimiento;
      this.usuarioLogueado.username = form.value.username;
      this.usuarioLogueado.nuss = form.value.nuss;
    }

    if (form.status == "VALID") {
      //comprobar que el domicilio no tiene números al inicio pero sí puede contener números
      if (this.comprobarNumeroAlInicioDomicilio() == false) {
        this.snackError("Domicilio con números al inicio.");
      } else {
        this.userService.putUser(this.usuarioLogueado);
        this.snackSuccess("Usuario modificado correctamente");
      }
    }
  }

  comprobarNumeroAlInicioDomicilio() {
    if (
      this.usuarioLogueado.domicilio.indexOf("1") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("2") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("3") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("4") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("5") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("6") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("7") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("8") > -1 ||
      this.usuarioLogueado.domicilio.indexOf("9") > -1
    ) {
      return false;
    } else {
      return true;
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

  eliminarcambios(form) {
    //si eres usuario NORMAL limpiamos solo los campos que puede mofificar
    if (
      this.usuarioLogueado.gestor == false &&
      this.usuarioLogueado.admin == false
    ) {
      this.usuarioform.controls["domicilio"].setValue(
        this.usuarioLogueado.domicilio
      );
      this.usuarioform.controls["localidad"].setValue(
        this.usuarioLogueado.localidad
      );
      this.usuarioform.controls["telefono"].setValue(
        this.usuarioLogueado.telefono
      );
      this.usuarioform.controls["provincia"].setValue(
        this.usuarioLogueado.provincia
      );
      this.usuarioform.controls["password"].setValue(
        this.usuarioLogueado.password
      );
      this.usuarioform.controls["email"].setValue(this.usuarioLogueado.email);
    }
    //si eres usuario GESTOR/ADMIN limpiamos solo los campos que puede mofificar
    else {
      this.usuarioform.controls["nombre"].setValue(this.usuarioLogueado.nombre);
      this.usuarioform.controls["apellidos"].setValue(
        this.usuarioLogueado.apellidos
      );
      this.usuarioform.controls["fechaNacimiento"].setValue(
        this.usuarioLogueado.fechaNacimiento
      );
      this.usuarioform.controls["username"].setValue(
        this.usuarioLogueado.username
      );
      this.usuarioform.controls["domicilio"].setValue(
        this.usuarioLogueado.domicilio
      );
      this.usuarioform.controls["localidad"].setValue(
        this.usuarioLogueado.localidad
      );
      this.usuarioform.controls["telefono"].setValue(
        this.usuarioLogueado.telefono
      );
      this.usuarioform.controls["provincia"].setValue(
        this.usuarioLogueado.provincia
      );
      this.usuarioform.controls["password"].setValue(
        this.usuarioLogueado.password
      );
      this.usuarioform.controls["email"].setValue(this.usuarioLogueado.email);
    }
  }
}
