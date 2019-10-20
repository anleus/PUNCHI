import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { User } from '../../models/users';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  hide = true;
  public user: User;
  public existe: Boolean;

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
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  onCrearUsuario(form) {
    console.log(this.usuarioExistente(form.value.username));

    this.determinarusuario(form);
    this.usuarioExistente(form.value.username);
    this.usuarioExistente(form.value.username);
    if (this.existe == false) {
      if (form.value.nuss == "") form.value.nuss = 0;
      console.log(form.value);
      this.userService.crearUsuario(form.value).subscribe(res => {
        this.router.navigateByUrl('/inicio');
      })
    }
    else {
      //solucionar que se actualiza TARDE
      console.log("ESTE USERNAME YA ESTÁ EN USO") //sustituir por mensaje en react
    }
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

  usuarioExistente(username) {
    this.userService.getUserByUsernameDOS(username).subscribe(this.comprobarusarioExistente.bind(this));
  }

  comprobarusarioExistente(res: any) {
    if (res == null) this.existe = false;
    else this.existe = true;
  }
}
