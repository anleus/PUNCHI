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
  UsuarioLogueado: User;

  public user: User;
  users: User[];
  departamentos: Departamento[];
  public userForm: FormGroup;
  submitted = false;
  gestion = true;
  selectedDepartamento: Departamento;
  selectedUsuario: User;

  public userV: User;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private departamentosService: DepartamentosService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    this.user = new User();
    this.userV = new User();
  }

  ngOnInit() {}

  //inicialización formulario
  usuarioform = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    apellidos: new FormControl("", [Validators.required]),
    fechaNacimiento: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    nuss: new FormControl(),
    telefono: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(4)
    ]),
    localidad: new FormControl("", [Validators.required]),
    provincia: new FormControl("", [Validators.required]),
    domicilio: new FormControl("", [Validators.required])
  });

  guardarcambios(form) {
    var usuarioActual = this.authService.getCurrentUser();
    this.userV.password = this.user.password;
    this.userV.domicilio = this.user.domicilio;
    this.userV.provincia = this.user.provincia;
    this.userV.localidad = this.user.localidad;
    this.userV.nombre = this.user.nombre;
    this.userV.apellidos = this.user.apellidos;
    this.userV.fechaNacimiento = this.user.fechaNacimiento;
    this.userV._id = this.user._id;
    this.userV.email = this.user.email;
    this.userV.gestor = this.user.gestor;
    this.userV.nuss = this.user.nuss;
    this.userV.admin = this.user.admin;
    this.userV.becario = this.user.becario;
    this.userV.deleted = this.user.deleted;
    this.userV.telefono = this.user.telefono;
    if (form.status == "VALID") {
      usuarioActual.subscribe(user => {
        this.userService.putUser(this.user);
        this.snackSuccess("Usuario modificado correctamente");
      });
    } else {
      this.snackError(
        "No puedes modificar datos que no son del usuario logueado"
      );
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
