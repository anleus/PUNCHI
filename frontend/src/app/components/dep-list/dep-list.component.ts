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
  selector: 'app-dep-list',
  templateUrl: './dep-list.component.html',
  styleUrls: ['./dep-list.component.css'],
})

export class DepListComponent implements OnInit {
  departamento: Departamento;
  deparset = [];
  admin = false;
  gestor = false;
  logUser = this.authService.getCurrentUser();
 
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'responsable', 'select'];
  
 
  constructor(private departamentosService: DepartamentosService, private router: Router,
    private authService: AuthenticationService, private userService: UserService) { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    ngOnInit() {
      this.determinarUsuario();
      if (this.admin) this.getDeptAdmin();
      //else this.getUsersGestor();
    }
  
  
    determinarUsuario() {
      if (this.logUser.source["_value"] != null) {
        this.admin = this.logUser.source["_value"].admin;
        this.gestor = this.logUser.source["_value"].gestor;
      };
    }
  
  
    //Mostrar personas para admin
  
    getDeptAdmin() {
      this.departamentosService.getDepartamentos().subscribe(
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
      console.log("tots", users);
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    }
  
    deleteDepSelected(element: Departamento) {
      //Falta mensaje de confirmación.
      //this.userService.deleteUser(element._id).subscribe(
      //  () => { window.location.reload() } //esto cambiar
      //)
/*       new MaterialAlertDialogBuilder(context, R.style.ThemeOverlay_MaterialComponents_MaterialAlertDialog_Centered)
      .setTitle("Title")
      .setMessage("Message")
      .setPositiveButton("Accept", () => {      this.departamentosService.deleteDept(element._id).subscribe(
        () => {window.location.reload()}
      )}); */

    }
  
    editDepSelected(element: Departamento){
      
    }

    editDepResponsibleSelected(element: Departamento) {

    }

    gotoDrag() {

    }
  }


