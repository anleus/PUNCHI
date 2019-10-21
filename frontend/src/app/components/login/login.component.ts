import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'; 

import { environment } from "src/environments/environment";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@NgModule({
  declarations: [],
  imports: [
    HttpClient
  ],
  providers: [AuthenticationService]
    })

export class LoginComponent implements OnInit {
  hide = true;
  durationSec = 5;

  constructor(private authservice : AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    
    localStorage.clear();
  }


  logoutUser() {                                                      //Este logout servirá donde haya que ponerlo
    this.authservice.logout();
    console.log("Loggin out");
    window.location.href = environment.urlf + '/login';
  }

  loginUser(username, password) {
    if (typeof username == 'undefined' || typeof password == 'undefined') {
      console.log("Username o contraseña undefined");                 //Toast notification de que no puedes avanzar sin alguno de los dos campos
      return;
    }

    if (username.length <= 0 || password.length <= 0){                //Esto está aquí para criterios futuros
      return;                                                         //Ej: username.length > 8 && password.length > 5 y que contenga
                                                                      //números etc
    }

    this.authservice.login(username,password).subscribe(              //El subscribe está deprecated, habrá que mirar de cambiarlo
      res => {
                                                                      //Si retorna un user la autenticación es correcta y puedes pasar
        if (res == null) {
          document.getElementById('incorrecto').removeAttribute('style');
          this.openSnack('Usuario o contraseña incorrectos');
          return;
        }
        console.log("Login correcto");
        this.openSnack('Login correcto');
        window.location.href = environment.urlf + '/inicio';
    },
      err => {
        console.log("login.component.ts - Ha habido un error -->");
        console.error(err);
      });
  }

  openSnack(message) {
    this.snackBar.open(message, '', {
      announcementMessage: 'Ha ocurrido un error. Inténtalo de nuevo',
      duration: this.durationSec * 1000,
      panelClass: 'center',                                             //No funciona, no sé por qué
      horizontalPosition: "left",
      verticalPosition: "bottom"
    });
  }
}
