import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import { DatePipe } from '@angular/common';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';


@Component({
  selector: 'app-asignar-dep',
  templateUrl: './asignar-dep.component.html',
  styleUrls: ['./asignar-dep.component.css'],
  providers: [DatePipe]
})
export class AsignarDepComponent implements OnInit {

  public user: User;
  users : User[];
  public userForm: FormGroup;
  submitted = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { 
    this.user= new User();
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required],
      password: ['', Validators.required],
      provincia: ['', Validators.required]
    });
    this.getUsuarios();

  }
  private onGetUserByName(res: any) {
    this.user = res;
  }


    getUsuarios(){
      /*this.userService.getUsuarios()
      .subscribe(res =>
        this.userService.getUsuarios = res as User[];
        console.log(res);
        )
      */
     var usuarioObs = this.userService.getUsers();
     usuarioObs.subscribe(users => this.users = users)
  
    }
}
