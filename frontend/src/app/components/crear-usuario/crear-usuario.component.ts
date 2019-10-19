import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {UserService} from '../../services/user.service'
import {User} from '../../models/users'
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor(private userService:UserService, private router: Router ) { }

  ngOnInit() {
  }
  
  onCrearUsuario(form)  {
    console.log(form.value);
    this.userService.crearUsuario(form.value).subscribe(res => {
    this.router.navigateByUrl('/inicio');
  })  }
  

}
