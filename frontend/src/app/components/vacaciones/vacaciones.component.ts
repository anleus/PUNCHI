import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements OnInit {

  calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];

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
      this.calendarEvents = this.calendarEvents.concat(
        { // add new event data. must create new array
        title: 'Día de vacaciones',
        start: arg.date,
        allDay: true,
        color: 'orange'
        })
    }
  }

  handleButton() {
    console.log("Button clicked");
  }

  dateFormatter(date : Date) {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }

  constructor() { }

  ngOnInit() {
  }

}
