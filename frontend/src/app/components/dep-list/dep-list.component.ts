import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  ChangeDetectorRef
} from "@angular/core";
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
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from "@angular/material/dialog";
import { UserData } from "../usuarios/usuarios.component";
import { resolve } from "url";
import { reject } from "q";
import { map } from "rxjs/operators";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface DepData {
  DepName: string;
  DepId: string;
}
@Component({
  selector: "app-dep-list",
  templateUrl: "./dep-list.component.html",
  styleUrls: ["./dep-list.component.css"]
})
export class DepListComponent implements OnInit {
  departamento: Departamento;
  deparset = [];
  admin = false;
  gestor = false;
  logUser = this.authService.getCurrentUser();
  userName: string;
  userId: string;
  confirmation: boolean;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ["nombre", "responsable", "select"];

  constructor(
    private departamentosService: DepartamentosService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.determinarUsuario();
    if (this.admin) this.getDeptAdmin();
    else this.getDeptGestor();
  }

  determinarUsuario() {
    if (this.logUser.source["_value"] != null) {
      this.admin = this.logUser.source["_value"].admin;
      this.gestor = this.logUser.source["_value"].gestor;
    }
  }

  //Mostrar personas para admin

  getDeptAdmin() {
    this.departamentosService.getDepartamentos().subscribe(
      res => {
        this.addDepartment(res);
      },
      err => {
      }
    );
  }

  getDeptGestor() {
    var depGestor: Departamento[] = [];
    this.authService.getCurrentUser().subscribe((res: User) => {
      this.departamentosService
        .getDepartamentoByGestorOBJ(res._id)
        .subscribe((res: Departamento) => {
          depGestor.push(res);
          this.addDepartment(depGestor);
        });
    });
  }
  newDepartamento() {
    localStorage.setItem("editDepartamento", "false");

    this.router.navigate(["/personalizarDepartamento"]);
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

    users.forEach((element, i) => {
      if (element.responsable === null)
        element.responsable = "No hay responsable";
      else {
        this.userService
          .getUserById(element.responsable)
          .subscribe((res: User) => {
            element.responsable = res.nombre + " " + res.apellidos;
            this.rellenar(users);
          });
      }
    });

    /* this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator; */
  }
  rellenar(users) {
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

  editDepSelected(element: Departamento) {
    localStorage.setItem("editDepartamento", "true");
    localStorage.setItem("departamentoID", element._id);

    this.router.navigate(["/personalizarDepartamento"]);
  }

  editDepResponsibleSelected(element: Departamento) {}

  searchResponsible(element: string) {
    return new Promise((resolve, reject) => {});
  }

  openDialog(element: User): void {
    const dialogRef = this.dialog.open(OverviewConfirmacionBorradoDep, {
      width: "500px",
      data: { DepName: element.nombre, DepId: element._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.confirmation) {
      }
    });
  }
}
@Component({
  selector: "confirmacion-borrado-dep",
  templateUrl: "confirmacion-borrado-dep.html",
  styleUrls: ["./confirmacion-borrado-dep.css"]
})
export class OverviewConfirmacionBorradoDep {
  constructor(
    public dialogRef: MatDialogRef<OverviewConfirmacionBorradoDep>,
    @Inject(MAT_DIALOG_DATA) public data: DepData,
    private departamentoService: DepartamentosService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteDepSelected(elementId: string) {
    try {
      this.departamentoService.deleteDept(elementId).subscribe();
    } catch (err) {}
    this.dialogRef.close();
    window.location.reload();
  }
}
