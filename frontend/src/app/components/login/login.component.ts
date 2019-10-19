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
        console.log(res);
    },
      err => {
        console.log(err);
      });
  }

  prueba() {
    this.UserService.getUser().subscribe(
      res => {
        console.log(res);
    },
    err => {
      console.log(err);
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

  console(email, pass) {
    console.log(email, pass);
  }

}
