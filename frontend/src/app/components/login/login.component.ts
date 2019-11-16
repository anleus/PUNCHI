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
  durationSec = 3;

  constructor(private authservice : AuthenticationService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    localStorage.clear();
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
        if (res == null) {                                            
          this.openSnack('Usuario o contraseña incorrectos');
          return;
        }
        console.log("Login correcto");
        window.location.href = environment.urlf + '/inicio';
    },
      err => {
        console.error(err);
      });
  }

  openSnack(message) {
    this.snackBar.open(message, '', {
      announcementMessage: 'Ha ocurrido un error. Inténtalo de nuevo',
      duration: this.durationSec * 1000,
      panelClass: ['alert-red'],                                            
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
