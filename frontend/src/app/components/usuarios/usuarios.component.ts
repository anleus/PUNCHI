import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DepartamentosService } from "../../services/departamentos.service";
import { AuthenticationService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";
import { User } from "src/app/models/users";
import { Departamento } from "src/app/models/departamento";

import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Observable } from "rxjs";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from "@angular/material/dialog";
import { Button } from 'protractor';

export interface UserData {
  userName: string;
  userId: string;
}

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  departamento: Departamento;
  usersret = [];
  admin = false;
  gestor = false;
  logUser = this.authService.getCurrentUser();
  userName: string
  userId: string;
  confirmation: boolean;
  permisos : boolean;


  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource = ELEMENT_DATA;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    "nombre",
    "apellidos",
    "departamento",
    "select"
  ];

  constructor(
    private departamentosService: DepartamentosService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.determinarUsuario();
    if (this.admin){
      this.getUsersAdmin();
      this.permisos=true;
    } 
    else{
      this.getUsersGestor();
      this.permisos=false;
    } 

  }

  determinarUsuario() {
    if (this.logUser.source["_value"] != null) {
      this.admin = this.logUser.source["_value"].admin;
      this.gestor = this.logUser.source["_value"].gestor;
    }
  }

  //Mostrar usuarios para gestor
  getUsersGestor() {
    this.departamentosService
      .getDepartamentoByGestor(this.logUser.source["_value"]._id)
      .subscribe(res => {
        
        if (res != null) {
          var nombreDepartamento = res["nombre"];
          var idsUsuarios = res["usuarios"];
          var numberUsers = idsUsuarios.length;
          var auxnumber = 1;
          var users;
          idsUsuarios.forEach(element => {
            this.userService.getUserById(element).subscribe(resp => {
              if (resp != null) {
                if (resp["_id"] != this.logUser.source["_value"]._id) {
                  if (resp["deleted"] == false) {
                    var aux;
                    aux = resp;
                    this.usersret.push(aux);
                    console.log(this.usersret);
                  }
                }
              } else {
                console.log("usuario no existente, ALERTA");
              }
              if (auxnumber == numberUsers) {
                this.addDepartmentGestor(this.usersret, nombreDepartamento);
              }

              auxnumber++;
            });
          });
        } else {
          console.log("no es responsable de ningún deparatmento");
        } //cambiar por alerta
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
      res => {
        res.forEach((element, i) => {
          if (element["_id"] == this.logUser.source["_value"]._id) {
            res.splice(i, 1);
          }
          if (element["deleted"] == true) {
            console.log(this.logUser);
            res.splice(i, 1);
          }
        });
        this.addDepartment(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  addDepartment(users) {
    users.forEach(element => {
      this.departamentosService
        .getDepartamentoByUser(element._id)
        .subscribe(res => {
          if (res[0] != null) {
            element.departamento = res[0].nombre;
          } else {
            element.departamento = "No pertenece a ningún departamento";
          }
        });
    });
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(element: User): void {
    const dialogRef = this.dialog.open(ConfirmacionBorrarUsuario, {
      width: "650px",
      data: {
        userName: element.nombre + " " + element.apellidos,
        userId: element._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.confirmation) {
        console.log("Usuario" + result + "eliminado");
      }
    });
  }

  editUserSelected(element: User) {
    this.userService.selectedUser = element;
    this.router.navigate(["/fichapersonaladmin"], {
      queryParams: { nombre: element.username }
    });
  }

  generarInforme(element: User) {
    this.userService.selectedUser = element;
    this.router.navigate(["/informes"], {
      queryParams: { nombre: element.username }
    });
  }
  

  newUser() {
    if(this.admin){this.router.navigate(["/crearusuario"]);}
    
  }
}

@Component({
  selector: "confirmacion-borrado",
  templateUrl: "confirmacion-borrado.html",
  styleUrls: ["./confirmacion-borrado.css"]
})
export class ConfirmacionBorrarUsuario {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionBorrarUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: UserData,
    private userService: UserService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUserSelected(elementId: string) {
    this.userService.getUserById(elementId).subscribe((res: User) => {
      res.deleted = true;
      try {
        this.userService.putUser(res);
      } catch (err) {}
      this.dialogRef.close();
    });
  }
}
