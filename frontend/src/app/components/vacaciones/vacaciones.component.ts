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
import { resolve } from 'url';

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
  _vid;
  pending = [];
  left;
  diasRestantes = 0;
  diasPorConfirmar = 0;
  diasAceptados = 0;
  noVacationFlag = false; //Un bool que se pone a true si el usuario no tiene vacaciones

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
        if (res == null || typeof res == "undefined") {
          this._vid = this.currentUserId;
          this.vacationDaysLeft = 30;
          this.llenartabla(undefined, undefined, 0);
          this.noVacationFlag = true;
          return;
        }
        this.llenartabla(res.pending.length, res.past.length, res.left);
        res.pending.forEach(vac => {
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
        this.vacationPast = res.past;
        this.vacationDaysLeft = res.left;
      });
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  returnBDCorrectDate(d: Date) {
    // Devuelve la fecha correcta para su almacenamiento en la BD
    d = new Date(d);
    console.log(d);
    console.log(d.getTime());
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString();
  }

  async handleDateClick(arg) {
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
          await this.checkDiaSolicitado(arg.date).then(check => {
            if (check) {
              this.snackWarning('El día solicitado ya se estaba confirmado o pendiente de confirmación');
              //alert("El día seleccionado ya está pendiente de confirmación o confirmado");
              return;
            } else {
              this.createEvent(arg.date);
            }
          });
        }
      } else {
        alert("No puedes seleccionar el día de hoy ni uno pasado");
      }
    } else {
      alert("No te quedan días de vacaciones disponibles");
    }
  }

  createEvent(date) {
    this.pending.push(this.returnBDCorrectDate(date));
    if (this.noVacationFlag) {
      this.vacationservice.createVacation(
        this._vid,
        this.pending,
        (this.left = this.vacationDaysLeft),
        this.vacationPast
      );
      this.noVacationFlag = false;
    } else {
      this.vacationservice.updateVacation(
        this._vid,
        this.pending,
        (this.left = this.vacationDaysLeft),
        this.vacationPast
      );
    }
    this.diasPorConfirmar++;
    this.calendarEvents = this.calendarEvents.concat({
      start: date,
      allDay: true,
      rendering: "background",
      backgroundColor: "#FF0000"
    });
    this.crearSolicitud(date);
  }

  checkDiaSolicitado(dia) {
    var flag = false;
    dia = new Date(this.returnBDCorrectDate(dia));
    this.pending.forEach(elem => {
      elem = new Date(elem);
      if (elem.getTime() == dia.getTime()) {
        flag = true;
      }
    });

    if (flag) {
      return new Promise((resolve) => {resolve(true);});
    } else {
      return new Promise((resolve) => {resolve(false);});
    }
  }

  async handleSelectDate(arg) {
    this.d = Date.now();
    if (
      this.diasRestantes - this.diasPorConfirmar >=
      this.daysCount(arg.start, arg.end)
    ) {
      if (this.addDay2Month(arg.start, 1).getTime() == arg.end.getTime())
        return;
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
          var flag = false;
          let date = arg.start;

          for (i = 0; i < this.daysCount(arg.start, arg.end); i++) {
            date = this.addDay2Month(arg.start, i);
            console.log('handleSelectDate --> arg.start: ' + date + ' // i: ' + i);
            await this.checkDiaSolicitado(date).then(check => {
              if (check) {
                flag = true
                return;
              } else {
                this.createEvent(date);
              }
            });
          }
          if (flag) {
            this.snackWarning('Uno o varios días solicitados ya se estaban confirmados o pendientes de confirmación');
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
    if (diastotales == 0 || diastotales == undefined) {
      this.diasRestantes = 30; //CAMBIAR ¿CÓMO Y DÓNDE SE CALCULA EL NÚMERO DE DÍAS DE VACACIONES?
    } else {
      this.diasRestantes = diastotales;
    }
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
        this.snackSuccess("Día/s de vacaciones solicitado/s correctamente")
      );
  }

  addDay2Month(d: Date, i: number) {
    i = i * 3600 * 1000 * 24;
    var date = new Date(d.valueOf() + i);
    return date;
  }

  daysCount(ini: Date, fi: Date) {
    let count = (fi.getTime() - ini.getTime()) / (1000 * 3600 * 24);
    return Math.floor(count);
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

  snackWarning(message) {
    this.snackBar.open(message, "", {
      announcementMessage: "Uno o varios días solicitados ya se estaban confirmados o pendientes de confirmación. Se han solicitado' + ' los días disponibles",
      duration: 3 * 1000,
      panelClass: ["warning-yellow"],
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }
}

/*
- crear la entrada vacaciones para un usuario que no la tenga
- la tabla no se actualiza
- hacer bonita la tabla
 */
