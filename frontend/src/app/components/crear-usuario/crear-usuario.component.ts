import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {UserService} from '../../services/user.service'
import {User} from '../../models/users';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  hide = true;
  usuarioform = new FormGroup ({
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    fechaNacimiento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipousuario: new FormControl('', [Validators.required]),
    nuss: new FormControl(),
    telefono: new FormControl('', [Validators.required ]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    provincia: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required])

  });
  constructor(private userService:UserService, private router: Router ) { }

  ngOnInit() {
  }
  
  onCrearUsuario(form)  {
    this.determinarusuario(form);
    if(form.value.nuss == "") form.value.nuss = 0;
    console.log(form.value);
    this.userService.crearUsuario(form.value).subscribe(res => {
    this.router.navigateByUrl('/inicio');
  })  }
  
  determinarusuario(form) {
    if(form.value.tipousuario == "normal") {
      form.value.becario = false;
      form.value.gestor = false;
      form.value.admin = false;
    }
    else if(form.value.tipousuario == "becario") {
      form.value.becario = true;
      form.value.gestor = false;
      form.value.admin = false;
    }
    else if(form.value.tipousuario == "gestor") {
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

}
