import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { DepartamentosService } from '../../services/departamentos.service'
import { AuthenticationService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/users';
import { Departamento } from 'src/app/models/departamento';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface UserData {
  userName: string;
  userId: string;
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
  userName: string;
  userId: string;
  confirmation: boolean;


  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['nombre', 'apellidos', 'departamento', 'select'];

  constructor(private departamentosService: DepartamentosService, private router: Router,
    private authService: AuthenticationService, private userService: UserService, public dialog: MatDialog) { }

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
        if (res != null) {
          var nombreDepartamento = res["nombre"];
          var idsUsuarios = res["usuarios"];
          var numberUsers = idsUsuarios.length;
          var auxnumber = 1;
          var users;
          idsUsuarios.forEach(element => {
            this.userService.getUserById(element).subscribe(
              resp => {
                if (resp != null) {
                  var aux;
                  aux = resp;
                  this.usersret.push(aux);
                  if (auxnumber == numberUsers) {
                    this.addDepartmentGestor(this.usersret, nombreDepartamento);
                  }
                }
                else { console.log("usuario no existente, ALERTA");}
                auxnumber++;

              });
          });
        } else { console.log("no es responsable de ningún deparatmento"); } //cambiar por alerta
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
    console.log("tots", users);
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
  }

  

  openDialog(element: User): void {
    const dialogRef = this.dialog.open(ConfirmacionBorrarUsuario, {
      width: '650px',
      data: {userName: element.nombre + " " + element.apellidos, userId: element._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.confirmation) {
        console.log('Usuario' + result + 'eliminado');
      }
      
    });
  }

  editUserSelected(element: User){
    this.router.navigate(['/fichapersonaladmin'],{queryParams: {nombre: element.username}});
  }
}

@Component ({
  selector: 'confirmacion-borrado',
  templateUrl: 'confirmacion-borrado.html',
  styleUrls: ['./confirmacion-borrado.css']
})
export class ConfirmacionBorrarUsuario {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacionBorrarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private userService: UserService) {}
  
    onNoClick() : void {
      this.dialogRef.close();
    }

    deleteUserSelected(elementId: string) {
      this.userService.getUserById(elementId).subscribe(
        (res: User) => {
          res.deleted = true;
          try {
          this.userService.putUser(res);
          } catch (err) {}
          this.dialogRef.close();
        }
      )
    }
}
