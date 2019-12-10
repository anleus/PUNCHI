import { Component, OnInit } from "@angular/core";
import { JornadaService } from "src/app/services/jornada.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/users";
import { Jornada } from "src/app/models/jornada.model";

@Component({
  selector: "app-informes",
  templateUrl: "./informes.component.html",
  styleUrls: ["./informes.component.css"]
})
export class InformesComponent implements OnInit {
  userPrueba;
  usuarioform: FormGroup;
  informes: String[] = ["Informe Horas", "Informe horas extra"];
  inicio = new FormControl(new Date()).value;
  fin = new FormControl(new Date()).value;
  selected: String;
  nombreUsuario: string;

  constructor(
    private jornadaService: JornadaService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userPrueba = this.authService.currentUserValue._id;

    this.usuarioform = new FormGroup({
      fechaInicio: new FormControl(),
      fechaFin: new FormControl()
    });
  }

  horasExtraCSV() {
    console.log("Informe de horas extra");
    const rows = [
      ["user_id", "fecha", "horas extra"] //encabezado de la lista
    ];

    this.jornadaService
      .getJornadaFromUserToCSV(
        this.userPrueba,
        new Date(this.inicio),
        new Date(this.fin)
      )
      .subscribe(response => {
        for (var i = 0; i < response.length; i++) {
          var id = response[i][0];
          var fecha = response[i][1];
          var h = Number(response[i][2]);
          h = h / (3.6 * Math.pow(Math.E, 6));
          h -= 8;
          if (h < 0) h = 0;

          var jornada = new Array(id, fecha, h.toString());

          rows.push(jornada);
          //if (h < 0) response[i][2]. = "0"
          //else response[i][2] = h.toString()

          //rows.push(response[i])
        }
        //rows.concat(response)
      });

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
  }

  horasMensualesCSV() {
    console.log("Informe de horas mensuales");
    const rows = [
      ["name1", "city1", "some other info"],
      ["name2", "city2", "more info"]
    ];

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

  horasBtwFechasCSV() {
    console.log("Informe de horas entre fechas");
  }

  generarInforme(form) {
    var fechaI = form.value.fechaInicio;
    var fechaF = form.value.fechaFin;
    if (this.selected == "Informe Horas") {
      console.log(fechaI);
      console.log(fechaF);
      this.route.queryParams.subscribe(params => {
        this.nombreUsuario = params["nombre"] || 0;
      });

      this.userService
        .getUserByUsernameDOS(this.nombreUsuario)
        .subscribe((user: User) => {
          this.jornadaService.getUserPeriodJornadas({
            id: user._id,
            initDate: fechaI,
            endDate: fechaF
          });
          /*     
          .then(jornadas: Jornada[]) => {
            console.log(jornadas);
          }); */
        });
    } else if (this.selected == "Informe horas extra") {
      console.log(fechaI);
      console.log(fechaF);
      console.log("Informe horas extra");
    } else if (fechaI == null || fechaF == null) {
      console.log("Necesario introducir fecha");
    } else {
      console.log("Necesario introducir tipo de informe");
    }
  }
}
