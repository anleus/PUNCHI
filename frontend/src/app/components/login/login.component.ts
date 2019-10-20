import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';

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
  }

  loginUser(username, pass) {
    //this.authservice.login(username.pass);
    //this.UserService.getUserByUsername(username)
    
    this.authservice.login(username,pass).subscribe(
      res => {
        //Si retorna un user la autenticación es correcta y puedes pasar
        console.log("Puedes pasar");
    },
      err => {
        //ERROR 
        //NO PUEDES PASAAR
        console.error(err);
        console.log("NO puedes pasar");
      });

  }
}
