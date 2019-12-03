import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { VacationService } from "src/app/services/vacation.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { IncidenciaService } from "src/app/services/incidencia.service";
import { Incidencia } from "../../models/incidencia";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-vacaciones",
  templateUrl: "./vacaciones.component.html",
  styleUrls: ["./vacaciones.component.css"]
})
export class VacacionesComponent implements OnInit {
  @ViewChild(FullCalendarComponent, { static: true })
  calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  eventCount;
  vacationDaysLeft;
  vacationPast;
  currentUserId;
  d;
  _id;
  _vid;
  pending = [];
  left;
  diasRestantes = 0;
  diasPorConfirmar = 0;
  diasAceptados = 0;

  constructor(
    private vacationservice: VacationService,
    private authservice: AuthenticationService,
    private incidenciaService: IncidenciaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUserId = this.authservice.currentUserValue._id.toString();
    this.calendarComponent.selectMinDistance = 2;

    this.vacationservice
      .getVacationByUsername(this.authservice.currentUserValue._id.toString())
      .then(res => {
        //console.log(this.authservice.currentUserValue._id.toString());
        if (res == null || typeof res == "undefined") {
          console.log("User has no vacation days");
          this._vid = this.currentUserId;
          return;
        }
        //console.log(res)
        //pending = diasPorConfirmar
        //past = diasAceptados
        //left = diasRestantes
        //if (pendientes.length != undefined)
        //if (aceptados.length != undefined)
        this.llenartabla(res.pending.length, res.past.length, res.left);
        //this.llenartabla(res.pending, res.past, res.left);
        //console.log(res.left);
        res.pending.forEach(vac => {
          //console.log(vac);
          this.calendarEvents = this.calendarEvents.concat({
            start: vac,
            allDay: true,
            rendering: "background",
            backgroundColor: "#FF0000"
          });
        });

        res.past.forEach(vacp => {
          this.calendarEvents = this.calendarEvents.concat({
            start: vacp,
            allDay: true,
            rendering: "background",
            backgroundColor: "#37ff00"
          });
        });
        this._vid = res._id;
        this.pending = res.pending;
        this.vacationDaysLeft = res.left;
        this.vacationPast = res.past;
      });
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  returnBDCorrectDate(d: Date) {
    // Devuelve la fecha correcta para su almacenamiento en la BD
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
  }

  handleDateClick(arg) {
    this.d = Date.now();
    if (this.diasRestantes - this.diasPorConfirmar >= 1) {
      if (arg.date.getTime() > this.d) {
        if (
          confirm(
            "¿Seguro que quieres solicitar un día de vacaciones este día: " +
              this.dateFormatter(arg.date) +
              "?"
          )
        ) {
          this.diasPorConfirmar++;

          this.calendarEvents = this.calendarEvents.concat({
            start: arg.date,
            allDay: true,
            rendering: "background",
            backgroundColor: "#FF0000"
          });

          this.pending.push(this.returnBDCorrectDate(arg.date));
          this.vacationservice.updateVacation(
            this._vid,
            this.pending,
            (this.left = this.vacationDaysLeft),
            this.vacationPast
          );
          this.crearSolicitud(arg.date);
        }
      } else {
        alert("No puedes seleccionar el día de hoy ni uno pasado");
      }
    } else {
      alert("No te quedan días de vacaciones disponibles");
    }
  }

  checkDiaSolicitado(dia) {
    //falta incluirlo
    this.vacationservice
      .getVacationByUsername(this.authservice.currentUserValue._id.toString())
      .then(res => {
        if (res == null || typeof res == "undefined") {
          return false;
        } else {
          res.pending.forEach(element => {
            if (element == dia) {
              return true;
            }
          });
        }
      });
  }

  handleSelectDate(arg) {
    this.d = Date.now();
    if (
      this.diasRestantes - this.diasPorConfirmar >=
      this.daysCount(arg.start, arg.end)
    ) {
      if (this.addDay2Month(arg.start, 1).getTime() == arg.end.getTime())
        return; //Workaround guarro para evitar la selección de un único día

      if (arg.start.getTime() > this.d) {
        if (
          confirm(
            "¿Seguro que quieres solicitar vacaciones desde: " +
              this.dateFormatter(arg.start) +
              " hasta: " +
              this.dateFormatter(arg.end) +
              "?"
          )
        ) {
          var i;
          let date = arg.start;

          for (i = 0; i < this.daysCount(arg.start, arg.end); i++) {
            date = this.addDay2Month(arg.start, i);
            this.calendarEvents = this.calendarEvents.concat({
              title: "Día de vacaciones",
              start: date,
              allDay: true,
              rendering: "background",
              backgroundColor: "#FF0000"
            });

            this.pending.push(this.returnBDCorrectDate(date));
            this.vacationservice.updateVacation(
              this._vid,
              this.pending,
              (this.left = this.vacationDaysLeft),
              this.vacationPast
            );

            this.crearSolicitud(date);
          }
        }
      } else {
        alert("No puedes seleccionar el día de hoy ni uno pasado");
      }
    } else {
      alert("No te quedan días de vacaciones disponibles");
    }
  }

  crearSolicitud(date) {
    console.log(date);
    var newIncidencia = new Incidencia();
    newIncidencia.id_user = this.authservice.currentUserValue._id;
    newIncidencia.vacaciones = true;
    newIncidencia.incidencias = false;
    newIncidencia.estado = "pendiente";
    newIncidencia.asunto = "Solicitud vacaciones";
    newIncidencia.mensaje = this.returnBDCorrectDate(date);
    newIncidencia.leido = false;
    this.newIncidenciaFunc(newIncidencia);
  }

  llenartabla(pendientes, aceptados, diastotales) {
    this.diasRestantes = diastotales;
    if (pendientes != undefined) {
      this.diasPorConfirmar = pendientes;
    } else this.diasPorConfirmar = 0;
    if (aceptados != undefined) {
      this.diasAceptados = aceptados;
    } else this.diasAceptados = 0;
  }

  newIncidenciaFunc(incidencia: Incidencia) {
    this.incidenciaService
      .crearIncidencia(incidencia)
      .subscribe(res =>
        this.snackSuccess("Dia de vacaciones solicitado correctamente")
      );
  }

  addDay2Month(d: Date, i: number) {
    var date = new Date(d.valueOf());
    date.setDate(date.getDate() + i);
    return date;
  }

  daysCount(ini: Date, fi: Date) {
    let count = (fi.getTime() - ini.getTime()) / (1000 * 3600 * 24);
    return Math.floor(count);
  }

  handleButton() {
    console.log("Button clicked");
    console.log("All events: ");
  }

  getCorrectMonth(date: Date) {
    return date.getMonth() + 1;
  }

  dateFormatter(date: Date) {
    return (
      date.getDate() +
      "/" +
      this.getCorrectMonth(date) + //Fecha errónea, arreglar - Arnau
      "/" +
      date.getFullYear()
    );
  }

  snackError(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Ya has solicitado este dia de vacaciones",
      duration: 3 * 1000,
      panelClass: ["alert-red"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  snackSuccess(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Dia de vacaciones solicitado correctamente",
      duration: 3 * 1000,
      panelClass: ["success-red"],
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }
}

/*
- que no pete si no té vacacions
- modificar el contador de la tabla
- si el dia ja està, no tornar a posar-lo (metodo creado)
- en sel·lecció múltiple, comprovar que algun dels dies no estiga ja demanat
- la tabla no se actualiza
- hacer bonita la tabla
 */
