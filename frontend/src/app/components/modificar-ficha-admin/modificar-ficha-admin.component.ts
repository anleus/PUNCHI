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

departamento = this.obtenerDepartamento(); 
Modo = "Modo administrador";

cambiarModo(){
  if(this.Modo == "Modo administrador"){
    this.Modo = "Modo normal";
  }else{
    this.Modo = "Modo administrador";
  }
}

comprobarDepartamento(){
  return this.departamento == "ee";
}

}
