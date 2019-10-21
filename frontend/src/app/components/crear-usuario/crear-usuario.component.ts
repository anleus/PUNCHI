import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { User } from '../../models/users';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { resolve } from 'dns';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  hide = true;
  public user: User;
  public existe: Boolean = false;

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

  usuarioExistente(username) {
    this.userService.getUserByUsernameDOS(username).subscribe(
      res => {
        if (res == null) {
          this.existe = false;
          console.log('RES from crear-usuario.component.ts ha sido null, por tanto ths.existe = false')
        } else {
          this.existe = true;
          console.log('RES from crear-usuario.component.ts NO ha sido null, por tanto ths.existe = true')
        }
      }
    );
    return new Promise(resolve => {
      resolve(this.existe);
    });
  }

  usuarioExistente2(form, crearUsuario) {
    this.userService.getUserByUsernameDOS(form.value.username).subscribe(
      res => {
        if (res == null) {
          this.existe = false;
          console.log('RES from crear-usuario SÍ ha sido null, por tanto existe = false, no existe el username')
          crearUsuario(this.existe);
        } else {
          this.existe = true;
          console.log('RES from crear-usuario NO ha sido null, por tanto existe = true, SÍ existe el username')
          crearUsuario(this.existe);
        }
      }
    );
  }

  crearUsuario(cond) {
    if (cond) { //Existe el username
      console.log("Callback ejecutado: Existe el username");
    } else { //No existe el username
      console.log("Callback ejecutado: No existe el username");
    }
  }

  async onCrearUsuario(form) {
    console.log('form.value.username from crear-usuario.component.ts: ' + form.value.username);

    this.determinarusuario(form); //no es importante

    const b = await this.usuarioExistente(form.value.username);
    console.log("b from crear-usuario.component.ts is: " + b)

    if (!b) {
      console.log("Este username NO está en uso")
      if (form.value.nuss == "") form.value.nuss = 0;
      console.log(form.value);
      this.userService.crearUsuario(form.value).subscribe(res => {
        this.router.navigateByUrl('/inicio');
      })
    }
    else {
      //solucionar que se actualiza TARDE
      console.log("Este username SÍ está en uso") //sustituir por mensaje en react
    }
  }

  comprobarusarioExistente(res: any) {
    if (res == null) this.existe = false;
    else this.existe = true;
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
}
