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
    else this.getUsersGestor();
  }


  determinarUsuario() {
    if (this.logUser.source["_value"] != null) {
      this.admin = this.logUser.source["_value"].admin;
      this.gestor = this.logUser.source["_value"].gestor;
    };
  }

  //Mostrar usuarios para gestor
  getUsersGestor() {
    this.departamentosService.getDepartamentoByGestor(this.logUser.source["_value"]._id).subscribe(
      res => {
        var nombreDepartamento = res["nombre"];
        var idsUsuarios = res["usuarios"];
        var numberUsers = idsUsuarios.length;
        var auxnumber = 1;
        var users;
        idsUsuarios.forEach(element => {
          this.userService.getUserById(element).subscribe(
            resp => {
              var aux;
              aux = resp;
              this.usersret.push(aux);
              if(auxnumber == numberUsers ) {
                this.addDepartmentGestor(this.usersret, nombreDepartamento);
              }
              auxnumber++;
            });
        });
      });
  }
  addDepartmentGestor(users, nomDep) {
    users.forEach(element => {
      element.departamento = nomDep;
    });
    this.dataSource = new MatTableDataSource<User>(users); 
    this.dataSource.paginator = this.paginator;
  }

  //Mostrar personas para admin

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
    console.log("add departemnt users null?", users);
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
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
  }

  deleteUserSelected(element: User) {
    //Falta mensaje de confirmación.
    //this.userService.deleteUser(element._id).subscribe(
    //  () => { window.location.reload() } //esto cambiar
    //)
  }
}
