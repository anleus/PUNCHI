import { Component, OnInit, Inject } from "@angular/core";
import { Departamento } from "src/app/models/departamento";
import { DepartamentosService } from "../../services/departamentos.service";
import { UserService } from "../../services/user.service";
import { GestureConfig } from "@angular/material/core";
import { User } from "src/app/models/users";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog
} from "@angular/material/dialog";

export interface DepData {
  DepName: string;
  DepId: string;
  PersObj: PersonalizarDepartamentoComponent;
}
@Component({
  selector: "app-personalizar-departamento",
  templateUrl: "./personalizar-departamento.component.html",
  styleUrls: ["./personalizar-departamento.component.css"]
})
export class PersonalizarDepartamentoComponent implements OnInit {
  isEdit: Boolean;
  departamentoEditing: Departamento;
  departamentos: Departamento[];
  departamentoAlreadyExists: Boolean = false;
  nombre: string = "";
  responsable: User;
  allUsers: User[];
  selectedResponsable: string;
  confirmation: boolean;

  // drag

  todo = [];

  done = [];

  constructor(
    private userService: UserService,
    private departamentosService: DepartamentosService,
    private UserService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (localStorage.getItem("editDepartamento") === "true") this.isEdit = true;
    this.getDepartamentos();

    this.UserService.getAllUsersObject().subscribe((res: User[]) => {
      this.allUsers = res.filter((v: User) => {
        return v.deleted == false;
      });
    });
    this.initDrag();
    if (this.isEdit) {
      //edit departamento
      var depID = localStorage.getItem("departamentoID");
      this.departamentosService
        .getDepartamentoByIDObject(depID)
        .subscribe((res: Departamento) => {
          this.departamentoEditing = res;
          this.nombre = res.nombre;

          let temp: any = res.responsable;
          this.selectedResponsable = temp;
        });
    } else {
      //new departamento
      this.nombre = "";
      this.selectedResponsable = "";
    }
  }

  isDuplicate() {
    if (!this.departamentos) return false;
    let duplicate = this.departamentos.filter(v => {
      return v.nombre === this.nombre;
    });
    if (!this.departamentoEditing) return false;
    if (this.isEdit && this.departamentoEditing.nombre === this.nombre) {
      this.departamentoAlreadyExists = false;
    } else {
      if (duplicate.length > 0) {
        //error departamento already exists
        this.departamentoAlreadyExists = true;
      } else {
        this.departamentoAlreadyExists = false;
      }
    }

    return this.departamentoAlreadyExists;
  }
  getDepartamentos() {
    var departamentoObs = this.departamentosService.getDepartamentos();
    console.log(departamentoObs);
    departamentoObs.subscribe(
      departamentos => (this.departamentos = departamentos)
    );
  }
  openErrorSnack(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Ha ocurrido un error. Inténtalo de nuevo",
      duration: 3 * 1000,
      panelClass: ["alert-red"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  guardarDepartamento() {
    //button guardar on click
    if (this.isDuplicate()) {
      //throw duplicate name error
      this.openErrorSnack("Nombre del departamento duplicado");
      return;
    }

    if (!this.isEdit) {
      this.departamentosService
        .crearDepartamento({
          nombre: this.nombre,
          usuarios: this.done,
          responsable: this.selectedResponsable
        })
        .then(() => {
          this.snackSuccess("Departamento creado correctamente");
        })
        .catch(() => {
          this.openErrorSnack("No se pudo actualizar");
        });
    } else {
      this.departamentosService
        .updateDepartamento({
          id: this.departamentoEditing._id,
          nombre: this.nombre,
          users: this.done,
          responsable: this.selectedResponsable
        })
        .then(() => {
          this.snackSuccess("Departamento actualizado correctamente");
        })
        .catch(() => {
          this.openErrorSnack("No se pudo actualizar");
        });
    }
  }

  snackSuccess(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Departamento creado correctamente",

      duration: 3 * 1000,

      panelClass: ["success-red"],

      horizontalPosition: "right",

      verticalPosition: "top"
    });
  }

  // drag

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  initDrag() {
    let i = 0;
    var users: string[];
    var idDep = localStorage.getItem("departamentoID");
    this.departamentosService
      .getDepartamentoByIDObject(idDep)
      .subscribe((Dep: Departamento) => {
        Dep.usuarios.forEach((element: any) => {
          this.userService.getUserById(element).subscribe((res: User) => {
            this.done.push(res);
          });
        });
        this.userService.getAllUsersObject().subscribe(res => {
          //res.forEach(element => {
          for (let index = 0; index < res.length; index++) {
            if (!this.comprobarUserRepe(res[index].nombre, this.done)) {
              this.todo.push(res[index]);
            }
          }

          // });
        });
      });
  }

  comprobarUserRepe(user: string, listUser: User[]) {
    for (let index = 0; index < listUser.length; index++) {
      if (user == listUser[index].nombre) return true;
    }

    return false;
  }

  openDialog(): void {
    var dialogRef;
    if (this.isEdit) {
      this.dialog.open(OverviewConfirmacionEditDep, {
        width: "500px",
        data: {
          DepName: this.departamentoEditing.nombre,
          DepId: this.departamentoEditing._id,
          PersObj: this
        }
      });
    } else {
      this.dialog.open(OverviewConfirmacionEditDep, {
        width: "500px",
        data: {
          DepName: this.nombre,
          // DepId: this.departamentoEditing._id,
          PersObj: this
        }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (this.confirmation) {
        console.log("Usuario" + result + "eliminado");
      }
    });
  }
}
@Component({
  selector: "confirmacion-edit-dep",
  templateUrl: "confirmacion-edit-dep.html",
  styleUrls: ["./confirmacion-edit-dep.css"]
})
export class OverviewConfirmacionEditDep {
  constructor(
    public dialogRef: MatDialogRef<OverviewConfirmacionEditDep>,
    @Inject(MAT_DIALOG_DATA) public data: DepData,
    private departamentoService: DepartamentosService
  ) {}
  private personalizarDep: PersonalizarDepartamentoComponent;
  private snackBar: MatSnackBar;

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmarEdit() {
    this.data.PersObj.guardarDepartamento();
    //this.openConfirmSnack('Edición completada')
    this.dialogRef.close();
  }

  openConfirmSnack(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Departamento guardado con éxito",
      duration: 3 * 1000,
      panelClass: ["alert-green"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}
