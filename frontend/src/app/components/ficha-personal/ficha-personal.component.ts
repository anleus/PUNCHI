import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "src/app/models/users";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-ficha-personal",
  templateUrl: "./ficha-personal.component.html",
  styleUrls: ["./ficha-personal.component.css"]
})
export class FichaPersonalComponent implements OnInit {
  //PASO3: crear un objeto user
  public user: User;
  public userForm: FormGroup;
  submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    //PASO 1: llamar al service que sea necesario
    this.user = new User();
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      provincia: ["", Validators.required]
    });

    //PASO2: llamar a userservice y getuserbyid
    this.userService
      .getUserByUsername("root")
      .then(this.onGetUserByName.bind(this));
  }

  private onGetUserByName(res: any) {
    this.user = res;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    debugger
    this.userService.putUser(this.user);
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  /**
   * Clase para obtener el departamento del usuario
   */
  obtenerDepartamento() {
    return "RRHH"; //Se debe sustituir por el acceso a la BD obteniendo el departamento del usuario loggeado
  }

  departamento = this.obtenerDepartamento();
  Modo = "Modo administrador";
  cambiarModo() {
    if (this.departamento == "RRHH") {
      this.departamento = "Gestor";
    } else if (this.departamento == "Gestor") {
      this.departamento = "Empleado";
    } else {
      this.departamento = "RRHH";
    }
  }

  comprobarDepartamento() {
    return this.departamento == "RRHH" || this.departamento == "Gestor";
  }

  comprobarDepartamentoAdmin() {
    return this.departamento == "RRHH";
  }
}
