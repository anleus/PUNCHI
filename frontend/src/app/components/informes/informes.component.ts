import { Component, OnInit } from "@angular/core";
import { JornadaService } from "src/app/services/jornada.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/users";
import { Jornada } from "src/app/models/jornada.model";
import { Observable } from "rxjs";

@Component({
  selector: "app-informes",
  templateUrl: "./informes.component.html",
  styleUrls: ["./informes.component.css"]
})
export class InformesComponent implements OnInit {
  userPrueba;
  informes: String[] = ["Informe Horas", "Informe horas extra"];
  selected: String;
  nombreUsuario: string;

  usuarioform = new FormGroup({
    fechaInicio: new FormControl("", [Validators.required]),
    fechaFin: new FormControl("", [Validators.required]),
    selector: new FormControl("", [Validators.required])
  });

  constructor(
    private jornadaService: JornadaService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userPrueba = this.authService.currentUserValue._id;
  }

  horasExtraCSV(user, finicio, fendo) {
    console.log("ye que tal");
    const rows = [
      ["user_id", "fecha", "horas extra"] //encabezado de la lista
    ];

    this.jornadaService
      .getJornadaFromUserToCSV(user, finicio, fendo)
      .subscribe(response => {
        for (var i = 0; i < response.length; i++) {
          var h = Number(response[i][2]);
          h = h / (3.6 * Math.pow(Math.E, 6));
          h -= 8;
          console.log(h);
          if (h < 0) response[i][2] = "0";
          else response[i][2] = h.toString();

          rows.push(response[i]);
        }
        let csvContent = "data:text/csv;charset=utf-8,";

        rows.forEach(function(rowArray) {
          let row = rowArray.join(",");
          csvContent += row + "\r\n";
        });
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "horasExtra.csv");
        document.body.appendChild(link);
        link.click();
      });
  }

  horasBtwFechasCSV() {
    console.log("Informe de horas entre fechas");
  }
  volver() {
    this.router.navigate(["/usuarios"]);
  }
  getPeriodHoras(jornadas: Jornada[]) {
    console.log(jornadas);

    const rows = [
      ["user_id", "id_jornada", "Comienzo", "Final"] //encabezado de la lista
    ];
    jornadas.forEach((v: Jornada) => {
      rows.push([v.user, v._id, v.begin, v.end]);
    });

    let csvContent = "data:text/csv;charset=utf-8,";

    rows.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "informeHorasMensuales.csv");
    document.body.appendChild(link);

    link.click();
  }

  generarInforme(form) {
    var fechaI = form.value.fechaInicio;
    var inicio = new Date(form.value.fechaInicio);
    var fin = new Date(form.value.fechaFin);
    var fechaF = form.value.fechaFin;
    console.log(fechaF);
    if (fechaI == null || fechaF == null) {
      console.log("Necesario introducir fecha");
    } else {
      if (this.selected == "Informe horas extra") {
        this.horasExtraCSV(this.userPrueba, inicio, fin);
      } else if (this.selected == "Informe Horas") {
        console.log(fechaI);
        console.log(fechaF);
        this.route.queryParams.subscribe(params => {
          this.nombreUsuario = params["nombre"] || 0;
        });

        this.userService
          .getUserByUsernameDOS(this.nombreUsuario)
          .subscribe((user: User) => {
            this.jornadaService
              .getUserPeriodJornadas({
                id: user._id,
                initDate: fechaI,
                endDate: fechaF
              })
              .subscribe(this.getPeriodHoras);
            /*     
          .then(jornadas: Jornada[]) => {
            console.log(jornadas);
          }); */
          });
      } else {
        console.log("Necesario introducir tipo de informe");
      }
    }
  }
}
