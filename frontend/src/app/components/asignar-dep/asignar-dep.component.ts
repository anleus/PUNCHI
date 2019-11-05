import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";
import { DatePipe } from '@angular/common';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Departamento } from 'src/app/models/departamento';
import { DepartamentosService } from 'src/app/services/departamentos.service';
//import { userInfo } from 'os';


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
  selectUser: Number;
  departamentos : Departamento[];
  Departamento : Departamento;
  selected: User;
  selected2: Departamento;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private departamentosService: DepartamentosService
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
    this.getDepartamentos()

  }
  private onGetUserByName(res: any) {
    this.user = res;
  }


    getUsuarios(){
     var usuarioObs = this.userService.getUsers();
     usuarioObs.subscribe(users => this.users = users)
  
    }

    getDepartamentos(){  
      var departamentoObs = this.departamentosService.getDepartamentos();
      console.log(departamentoObs)
      departamentoObs.subscribe(departamentos => this.departamentos = departamentos);
  
    }
    selectionChange(event: any) {
      this.selectUser = event.value;
      console.log(this.selectUser)
}

  //Click on asignar method
    asignarDepartamento() {
      if(!this.comprobarUserRepe(this.selected,this.selected2.usuarios)){
        if(this.selected2.usuarios===null || this.selected2.usuarios === undefined || this.selected2.usuarios === []){
        this.selected2.usuarios=[this.selected]
        }else{
        this.selected2.usuarios.push(this.selected)
        }
        this.departamentosService.deleteDept(this.selectedDepID).subscribe() 
        this.departamentosService.postDepartamentos(this.selected2)  
      
    }else{
      window.alert("El usuario ya está asignado al departamento")
    }
  }
    selectedDep = "";
    selectedDepID = "";
    selectedUs = "";
    seleccionDepartamento(dep: Departamento){ 
      this.selected2 = dep;
      this.selectedDep = dep.nombre;
      this.selectedDepID = dep._id;
    }
    
    seleccionUsuario(us: User){
      this.selected = us;
      this.selectedUs = us.nombre;
    }


    comprobarUserRepe(usr: User,userCol: User[]){
     return userCol.includes(usr);
    }
  }

