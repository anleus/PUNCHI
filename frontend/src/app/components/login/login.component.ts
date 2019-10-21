import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private authservice : AuthenticationService) { }

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
                                                                      //Si retorna un user la autenticación es correcta y puedes pasar
        if (res == null) {
          console.log("RES ha sido null - Usuario no encontrado");
          return;
        }
        console.log("Puedes pasar");
        window.location.href = environment.urlf + '/inicio';
    },
      err => {
        //ERROR 
        //NO PUEDES PASAAR
        console.error(err);
        console.log("NO puedes pasar");
      });

  }
}
