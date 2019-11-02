import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { User } from '../../models/users';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  hide = true;
  public user: User;
  public existe: Boolean = false;

  usuarioform = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipousuario: new FormControl('', [Validators.required]),
    nuss: new FormControl(),
    telefono: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    provincia: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required])

  });
  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  usuarioExistente2(form) {

    this.userService.getUserByUsernameDOS(form.value.username).subscribe(
      res => {
        if (res == null) {
          this.existe = false;
          console.log(form.value);
          this.determinarusuario(form);
          this.userService.crearUsuario(form.value).subscribe(res => {
            this.snackSuccess('Usuario guardado correctamente');
          })
        } else {
          this.existe = true;
          this.snackError('Nombre de usuario existente');

        }
      }
    );
  }


  determinarusuario(form) {
    if (form.value.tipousuario == "normal") {
      form.value.becario = false;
      form.value.gestor = false;
      form.value.admin = false;
    }
    else if (form.value.tipousuario == "becario") {
      form.value.becario = true;
      form.value.gestor = false;
      form.value.admin = false;
    }
    else if (form.value.tipousuario == "gestor") {
      form.value.becario = false;
      form.value.gestor = true;
      form.value.admin = false;
    }
    else {
      form.value.becario = false;
      form.value.gestor = false;
      form.value.admin = true;
    }
  }

  snackError(message) {
    this.snackBar.open(message, '', {
      announcementMessage: 'Ha ocurrido un error. Inténtalo de nuevo',
      duration: 3 * 1000,
      panelClass: ['alert-red'],                                            
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }

  snackSuccess(message) {
    this.snackBar.open(message, '', {
      announcementMessage: 'Usuario guardado correctamente',
      duration: 3 * 1000,
      panelClass: ['success-red'],                                            
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
