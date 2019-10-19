import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ficha-personal',
  templateUrl: './ficha-personal.component.html',
  styleUrls: ['./ficha-personal.component.css']
})
export class FichaPersonalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
