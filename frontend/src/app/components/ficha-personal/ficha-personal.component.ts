import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/users';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-ficha-personal',
  templateUrl: './ficha-personal.component.html',
  styleUrls: ['./ficha-personal.component.css']
})
export class FichaPersonalComponent implements OnInit {


  //PASO3: crear un objeto user
  userDto : User;

  constructor(private userservice : UserService ) { 
    //PASO 1: llamar al service que sea necesario
  }

  ngOnInit() {
    //PASO2: llamar a userservice y getuserbyid
    var user = this.userservice.getUser();
  }










 /**
 * Clase para obtener el departamento del usuario
 */
obtenerDepartamento(){
  return "RRHH";  //Se debe sustituir por el acceso a la BD obteniendo el departamento del usuario loggeado
}

departamento = this.obtenerDepartamento(); 
Modo = "Modo administrador";
cambiarModo(){
  if(this.departamento == "RRHH"){
    this.departamento = "Gestor";
  }else if(this.departamento == "Gestor"){
    this.departamento = "Empleado";
  }else{
    this.departamento = "RRHH";
  }
}

comprobarDepartamento(){
  return this.departamento == "RRHH" || this.departamento == "Gestor";
}

comprobarDepartamentoAdmin(){
  return this.departamento == "RRHH";
}


}
