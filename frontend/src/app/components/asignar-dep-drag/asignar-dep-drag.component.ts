import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { Departamento } from 'src/app/models/departamento';
import { UserService } from "src/app/services/user.service";
import { User } from 'src/app/models/users';
@Component({
  selector: 'app-asignar-dep-drag',
  templateUrl: './asignar-dep-drag.component.html',
  styleUrls: ['./asignar-dep-drag.component.css']
})
export class AsignarDepDragComponent implements OnInit {
  isEdit: Boolean;
  departamento: Departamento;
  todo = [];

  done = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor(private departamentosService: DepartamentosService, private userService: UserService ) { }

  ngOnInit() {
    if(localStorage.getItem("editDepartamento") == "true") {this.isEdit = true;}
    if(this.isEdit){


    var users: string[]
    var idDep = localStorage.getItem("departamentoID")
    this.departamentosService.getDepartamentoByIDObject(idDep)
    .subscribe((Dep: Departamento)=>{
        Dep.usuarios.forEach((element:any)  => {
        this.userService.getUserById(element)
        .subscribe((res: User)=> {
              this.done.push(res.nombre)
              this.userService.getAllUsersObject()
              .subscribe((res) => {
                    res.forEach(element => {
                    if(!this.comprobarUserRepe(element.nombre,this.done)) {this.todo.push(element.nombre)}
      });
    })
       })
     });
    })

    

    //Descarto los repetidos
  
  
     
    }else {
      //new departamento
    }


   
  } 

  comprobarUserRepe(user: string, listUser:string[]) {
    for (let index = 0; index < listUser.length; index++) {
      console.log("sdfsdfdsdds")
      console.log(user)
      console.log(listUser[index])

      if(user == listUser[index]) return true      
    }
 

    
    return false;
  }
  

}
