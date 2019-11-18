import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { VacationService } from "src/app/services/vacation.service";
import { AuthenticationService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  @ViewChild(FullCalendarComponent, { static: true }) calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  eventCount;

  constructor(private vacationservice: VacationService,
    private authservice: AuthenticationService) { }

  ngOnInit() {
    console.log(this.authservice.currentUserValue._id);
    this.vacationservice.getVacationByUsername(this.authservice.currentUserValue._id).then(
      res => {
        console.log("Got the vacation days!");
        console.log(typeof res);
        console.log(typeof res[0]);
        console.log(typeof res[0].pending);
        console.log(res.entries());
        if (res == null || typeof res == 'undefined') {
          console.log("User has no vacation days");
          return;
        }
        res.pending.array.forEach(vac => {
          console.log(vac);
          this.calendarEvents = this.calendarEvents.concat(
            {
              start: vac,
              allDay: true,
              rendering: 'background',
              backgroundColor: '#FF0000'
            })
        });
      }
    );

    /* this.vacationservice.getUserVacations().subscribe(res => {
      res[0].pending.forEach(vac => {
        this.calendarEvents = this.calendarEvents.concat(
          {
            editable: false,
            start: vac,
            allDay: true,
            rendering: 'background',
            backgroundColor: '#FF0000'
          })
      });
    }); */
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg) {
    if (confirm('¿Seguro que quieres solicitar un día de vacaciones este día: ' + this.dateFormatter(arg.date) + '?')) {
      this.calendarEvents = this.calendarEvents.concat(
        { // add new event data. must create new array
          start: arg.date,
          allDay: true,
          rendering: 'background',
          backgroundColor: '#FF0000'
        })
    }
  }

  handleSelectDate(arg) {
    if (confirm('¿Seguro que quieres solicitar vacaciones desde: ' + this.dateFormatter(arg.start) + ' hasta: ' + this.dateFormatter(arg.end) + '?')) {
      var i;
      let date = arg.start;
      for (i = 0; i < this.daysCount(arg.start, arg.end); i++) {
        this.calendarEvents = this.calendarEvents.concat(
          { // add new event data. must create new array
            title: 'Día de vacaciones',
            start: this.addDay2Month(arg.start, i),
            allDay: true,
            rendering: 'background',
            backgroundColor: '#FF0000'
          })
      }
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
    console.log("All events: ")
  }

  getCorrectMonth(date: Date) { return (date.getMonth() + 1) }

  dateFormatter(date: Date) {
    return date.getDate() + "/" + this.getCorrectMonth(date) + "/" + date.getFullYear();
  }
}
