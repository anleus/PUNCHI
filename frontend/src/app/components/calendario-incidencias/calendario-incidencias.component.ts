import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IncidenciaService } from "src/app/services/incidencia.service";
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario-incidencias.component.html',
  styleUrls: ['./calendario-incidencias.component.css']
})

export class CalendarioComponent implements OnInit {

  calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];
  eventCount;
 
  
  constructor(private incidenciaService: IncidenciaService,
    private authService: AuthenticationService) { 
    
  }

  ngOnInit() {
    /*this.incidenciaService.getIncidenciaByUserId(this.authService.currentUserValue._id).subscribe(
      res => {
        if (res == null || typeof res == 'undefined') {
          console.log("User has no faults");
          return;
        }
        res.forEach(inc => {
          console.log(inc);
          this.calendarEvents = this.calendarEvents.concat(
            {
              
            })
          
          
        });
      }
    )
    }*/
  }


}
