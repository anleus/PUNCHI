import { Component, OnInit, NgModule} from "@angular/core";
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
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'


@Component({
  selector: 'app-modificar-ficha-admin',
  templateUrl: './modificar-ficha-admin.component.html',
  styleUrls: ['./modificar-ficha-admin.component.css'],
  providers: [DatePipe, DepartamentosService]
  
})

@NgModule({ imports: [FormsModule] })
export class ModificarFichaAdminComponent implements OnInit {
  users : User[];
  usuarioAModificar: User;
  usuarioSinModificar :User;
  public userForm: FormGroup;
  public userV: User;
  usuarioform: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}




  ngOnInit() {
    //guardar copia usuario sin modificar
    //this.usuarioSinModificar = this.route.elemento;
    console.log("ss" + this.userService.selectedUser.nombre)
    this.usuarioAModificar = this.userService.selectedUser;
    console.log(this.userService.selectedUser)
    console.log(this.usuarioAModificar)

    //patrón email
    var emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

    this.usuarioform = new FormGroup({
      nombre: new FormControl(this.usuarioAModificar.nombre, [Validators.required]),
      apellidos: new FormControl(this.usuarioAModificar.apellidos,  [Validators.required]),
      fechaNacimiento: new FormControl(this.usuarioAModificar.fechaNacimiento, [Validators.required]),
      email: new FormControl(this.usuarioAModificar.email, [
        Validators.required,
        Validators.pattern(emailPattern)
      ]),
      nuss: new FormControl(this.usuarioAModificar.nuss, [Validators.required]),
      telefono: new FormControl(this.usuarioAModificar.telefono, [
        Validators.required,
        Validators.minLength(8)
      ]),
      username: new FormControl(this.usuarioAModificar.username,  [Validators.required]),
      password: new FormControl(this.usuarioAModificar.password, [
        Validators.required,
        Validators.minLength(5)
      ]),
      localidad: new FormControl(this.usuarioAModificar.localidad, [
        Validators.required,
        Validators.pattern("^[a-zA-Z -']+")
      ]),
      provincia: new FormControl(this.usuarioAModificar.provincia, [
        Validators.required,
        Validators.pattern("^[a-zA-Z -']+")
      ]),
      domicilio: new FormControl(this.usuarioAModificar.domicilio, [
        Validators.required
      ])
    });

    //si eres usuario NORMAL deshabilitamos la modificación de algunos campos
    if (
      this.usuarioAModificar.gestor == false &&
      this.usuarioAModificar.admin == false
    ) {
      this.usuarioform.controls["nombre"].disable();
      this.usuarioform.controls["apellidos"].disable();
      this.usuarioform.controls["fechaNacimiento"].disable();
      this.usuarioform.controls["username"].disable();
      this.usuarioform.controls["nuss"].disable();
    }
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

    if (form.status == "VALID") {
      //comprobar que el domicilio no tiene números al inicio pero sí puede contener números
      if (this.comprobarNumeroAlInicioDomicilio() == false ) {
        this.snackError("Domicilio con números al inicio.");
      } 
      else {
        this.userService.putUser(this.usuarioAModificar);
        this.snackSuccess("Usuario modificado correctamente");
      }
    }
  }

   comprobarNumeroAlInicioDomicilio(){
     if(this.usuarioAModificar.domicilio.indexOf("1") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("2") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("3") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("4") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("5") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("6") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("7") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("8") > -1 ||
     this.usuarioAModificar.domicilio.indexOf("9") > -1){
       return false;
     }else{
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
    this.usuarioform.controls["domicilio"].setValue(
      this.usuarioAModificar.domicilio
    );
    this.usuarioform.controls["localidad"].setValue(
      this.usuarioAModificar.localidad
    );
    this.usuarioform.controls["telefono"].setValue(
      this.usuarioAModificar.telefono
    );
    this.usuarioform.controls["provincia"].setValue(
      this.usuarioAModificar.provincia
    );
    this.usuarioform.controls["password"].setValue(
      this.usuarioAModificar.password
    );
    this.usuarioform.controls["email"].setValue(this.usuarioAModificar.email);
  }

}
