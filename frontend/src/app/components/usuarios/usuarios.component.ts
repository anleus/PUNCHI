import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { DepartamentosService } from '../../services/departamentos.service'
import { AuthenticationService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/users';
import { Departamento } from 'src/app/models/departamento';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  departamento: Departamento;
  usersret = [];
  admin = false;
  gestor = false;
  logUser = this.authService.getCurrentUser();

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'apellidos', 'departamento', 'select'];

  constructor(private departamentosService: DepartamentosService, private router: Router,
    private authService: AuthenticationService, private userService: UserService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  ngOnInit() {
    this.determinarUsuario();
    if (this.admin) this.getUsersAdmin();
    else this.getUsersGestor(this.tabla);
  }


  determinarUsuario() {
    if (this.logUser.source["_value"] != null) {
      this.admin = this.logUser.source["_value"].admin;
      this.gestor = this.logUser.source["_value"].gestor;
    };
  }

  getUsersGestor(callback) { //no sale en la tabla - falta evitar errores

    /*this.departamentosService.getDepartamentoByGestor(this.logUser.source["_value"]._id).subscribe( //prueba 
      res => {
        var idsUsuarios = res["_id"];
        this.userService.getUsersByDepartment(idsUsuarios).subscribe(
          resp => {console.log(resp);}
        );
      });*/

    this.getUsersAdmin(); //esto no funciona tampoco
    this.departamentosService.getDepartamentoByGestor(this.logUser.source["_value"]._id).subscribe(
      res => {
        var idsUsuarios = res["usuarios"];
        idsUsuarios.forEach(element => {
          this.userService.getUserById(element).subscribe(
            resp => {
              var aux;
              aux = resp;
              this.usersret.push(aux);
              //console.log("en el bucle", JSON.stringify(this.usersret))

            });
        });
        callback();
        //console.log("USUARIOS:COMPONENT", JSON.stringify(this.usersret)) //se lee antes
      });
  }

  tabla(){
    console.log("Hola");
    console.log("USUARIOS:COMPONENT", JSON.stringify(this.usersret)) //se lee antes
    this.dataSource = new MatTableDataSource<User>(this.usersret);
    this.dataSource.paginator = this.paginator;
}
  
  addDepartmentGestor(users, nomDep) {
    users.forEach(element => {
      element.departamento = nomDep;
    });

  }

  getUsersAdmin() {
    this.userService.getAllUsers().subscribe(
      (res) => {
        this.addDepartment(res);
        //console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addDepartment(users) {
    users.forEach(element => {
      this.departamentosService.getDepartamentoByUser(element._id).subscribe(
        res => {
          if (res[0] != null) {
            element.departamento = res[0].nombre;
          }
          else {
            element.departamento = "No pertenece a ningún departamento"
          }
        }
      );
    });
    //console.log("tots", JSON.stringify(users));
    console.log("tots", users);
    //this.dataSource = new MatTableDataSource<User>(users);
    //this.dataSource.paginator = this.paginator;
  }

  deleteUserSelected(element: User) {
    //Falta mensaje de confirmación.
    //this.userService.deleteUser(element._id).subscribe(
    //  () => { window.location.reload() } //esto cambiar
    //)
  }
}
