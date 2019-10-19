import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-modificar-ficha-admin',
  templateUrl: './modificar-ficha-admin.component.html',
  styleUrls: ['./modificar-ficha-admin.component.css']
})

export class ModificarFichaAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  
  }


 /**
 * Clase para obtener el departamento del usuario
 */
obtenerDepartamento(){
  return "RRHH";  //Se debe sustituir por el acceso a la BD obteniendo el departamento del usuario loggeado
}

nombreBotonGestion = "Gestionar ficha personal";
departamento = this.obtenerDepartamento(); 
Modo = "Modo administrador";
gestion = false;
cambiarModo(){
  if(this.departamento == "RRHH"){
    this.departamento = "Gestor";
  }else if(this.departamento == "Gestor"){
    this.departamento = "Empleado";
  }else{
    this.departamento = "RRHH";
  }
}

cambiarModoGestion(){
  if(this.gestion){
    this.gestion = false;
    this.nombreBotonGestion = "Gestionar ficha personal";
  }else{
    this.gestion = true;
    this.nombreBotonGestion = "Gestionar empleados";
  }
}

comprobarDepartamento(){
  return this.departamento == "RRHH" || this.departamento == "Gestor";
}

comprobarDepartamentoAdmin(){
  return this.departamento == "RRHH";
}

comprobarGestionAdministrativa(){
  return this.gestion;
}
}
