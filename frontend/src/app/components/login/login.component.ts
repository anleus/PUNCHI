import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
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
  providers: [UserService]
    })

export class LoginComponent implements OnInit {

  constructor(private UserService : UserService) { }

  ngOnInit() {
  }

  loginUser(username, pass) {
    this.UserService.getUserByUsername(username).subscribe(
      res => {
        var obj = JSON.parse(JSON.stringify(res));
        var usfrombd    = obj[0].username;
        var passfrombd  = obj[0].password;
        console.log("obj username is " + obj[0].username);
        console.log("obj pass is " + obj[0].password);

        if (passfrombd == pass) {
          console.log("You are in!");
        } else console.log("You are NOT!");
    },
      err => {
        console.error(err);
      });

  }

  loginId(id, pass) {
    this.UserService.getUserById(id).subscribe(
      res => {
        console.log(res);
    },
      err => {
        console.log(err);
      });
  }
}
