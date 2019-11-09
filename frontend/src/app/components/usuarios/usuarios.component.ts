import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { DepartamentosService } from '../../services/departamentos.service'
import { AuthenticationService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/users';
import { Departamento } from 'src/app/models/departamento';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  admin = false; 
  gestor = false;
  logUser = this.authService.getCurrentUser();
  
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'apellidos', 'select'];

  constructor(private departamentosService: DepartamentosService, private router: Router,
              private authService: AuthenticationService , private userService: UserService) { }
  
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.determinarUsuario();
    this.getUsersAdmin();
    //var dataSource = this.users;
    //console.log(this.users);
  }


  determinarUsuario() {  
    if (this.logUser.source["_value"]!= null) {
      this.admin = this.logUser.source["_value"].admin;
      this.gestor = this.logUser.source["_value"].gestor;
    };
  }

  tablaGestor() {

  }

  tablaAdmin() {

  }
  /*usuarioExistente2() {
      this.departamentosService.getDepartamentoByUser('5dae0cc075c3fa2c90124a55').subscribe(
        res => {
          console.log(res);
          }
      );
    }*/

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

    addDepartment(users){
      users.forEach(element => {
        //console.log(element._id);
        //console.log("despues de 1 id");

        this.departamentosService.getDepartamentoByUser(element._id).subscribe(
          res => {
            console.log('Hola');
            console.log(res['nombre']);
            element.departamento = res;
            console.log(res);
            }
        );
      });
      //console.log(users);
      this.dataSource = new MatTableDataSource<User>(users);
          this.dataSource.paginator = this.paginator;
    }
}
