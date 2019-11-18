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
    if (confirm('¿Seguro que quieres solicitar un día de vacaciones este día: ' + arg.dateStr + ' ?')) {
      this.calendarEvents = this.calendarEvents.concat(
        { // add new event data. must create new array
        title: 'Día de vacaciones',
        start: arg.date,
        allDay: arg.allDay,
        color: 'orange'
        })
    }
  }

  handleSelectDate(arg) {
    if (confirm('¿Seguro que quieres solicitar vacaciones desde: ' + arg.startStr + ' hasta : ' + arg.endStr + '?')) {
      this.calendarEvents = this.calendarEvents.concat(
        { // add new event data. must create new array
        title: 'Día de vacaciones',
        start: arg.date,
        allDay: arg.allDay,
        color: 'orange'
        })
    }
  }

  handleButton() {
    console.log("Button clicked");
  }

  constructor() { }

  ngOnInit() {
  }

}
