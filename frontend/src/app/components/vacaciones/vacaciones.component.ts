import { Component, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { VacationService } from "src/app/services/vacation.service";
import { AuthenticationService } from "src/app/services/auth.service";
import { type } from "os";
import { IncidenciaService } from 'src/app/services/incidencia.service';
import {Incidencia} from "../../models/incidencia";
import { MatSnackBar } from '@angular/material/snack-bar';


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
        console.log("Got the vacation days!");
        if (res == null || typeof res == "undefined") {
          console.log("User has no vacation days");
          this._vid = this.currentUserId;
          return;
        }
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

  //falta comprobar si no tens vacacions
  handleDateClick(arg) {
    console.log(this._vid);
    this.d = Date.now();
    if (arg.date.getTime() > this.d) {
      if (confirm("¿Seguro que quieres solicitar un día de vacaciones este día: " +
          this.dateFormatter(arg.date) + "?")) {
          this.calendarEvents = this.calendarEvents.concat({
          start: arg.date,
          allDay: true,
          rendering: "background",
          backgroundColor: "#FF0000"
        });
        this.pending.push(new Date(arg.date).toISOString());
        this.vacationservice.updateVacation(
          this._vid,
          this.pending,
          (this.left = this.vacationDaysLeft - 1),
          this.vacationPast
        );
        this.crearSolicitud(arg.date);
      }
    } else {
      alert("No puedes seleccionar el día de hoy ni uno pasado");
    }
  }

  crearSolicitud(date) {
    console.log((date).toISOString())
    var newIncidencia = new Incidencia;
    newIncidencia.id_user = this.authservice.currentUserValue._id;
    newIncidencia.vacaciones = true;
    newIncidencia.incidencias = false;
    newIncidencia.estado = "pendiente";
    newIncidencia.asunto = "Solicitud vacaciones"
    newIncidencia.mensaje = date.toISOString();
    console.log(newIncidencia);
    this.incidenciaService.crearIncidencia(newIncidencia).subscribe(res => console.log("incidencia creada!"));
    this.snackSuccess('Dia de vacaciones solicitado correctamente');
    //this.pending.push(new Date(arg.date).toISOString());
  }

  handleSelectDate(arg) {
    this.d = Date.now();
    if (this.addDay2Month(arg.start, 1).getTime() == arg.end.getTime()) return; //Workaround guarro para evitar la selección de un único día
    if (arg.start.getTime() > this.d) {
      if (confirm("¿Seguro que quieres solicitar vacaciones desde: " + this.dateFormatter(arg.start) +
            " hasta: " + this.dateFormatter(arg.end) + "?")) {
          var i;
          let date = arg.start;
          for (i = 0; i < this.daysCount(arg.start, arg.end); i++) {
            this.calendarEvents = this.calendarEvents.concat({
              // add new event data. must create new array
              title: "Día de vacaciones",
              start: this.addDay2Month(arg.start, i),
              allDay: true,
              rendering: "background",
              backgroundColor: "#FF0000"
            });
          }
      }
    } else {
      alert("No puedes seleccionar el día de hoy ni uno pasado");
    }
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
      this.getCorrectMonth(date) +
      "/" +
      date.getFullYear()
    );
  }

  snackSuccess(message) {
    this.snackBar.open(message, '', {
      announcementMessage: 'Usuario guardado correctamente',
      duration: 3 * 1000,
      panelClass: ['success-red'],
      horizontalPosition: "right",
      verticalPosition: "top",
    });
  }
}
