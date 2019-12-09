import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from "src/app/models/users";

import { Incidencia } from 'src/app/models/incidencia';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-notification-drop-down',
  templateUrl: './notification-drop-down.component.html',
  styleUrls: ['./notification-drop-down.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NotificationDropDownComponent implements OnInit {

  loggedUser : User;
  notifications : Incidencia[];
  newAlerts : Boolean;

  constructor(private incidenciaService : IncidenciaService, private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.getCurrentUser().subscribe((user :User) => {
      this.loggedUser = user;
      this.notifications = [];
      this.getIncidencias();  
    });
  }

  getIncidencias(){
    this.incidenciaService.getIncidencias().subscribe((res: Incidencia[])=> {
      //this.notifications = res;
      res.forEach(element => {
        if(element.id_user == this.loggedUser._id && !element.leido)
          this.notifications.push(element)
      });
      this.newAlerts = this.notifications.length != 0;
    })
  }

  leerNotificacion(notificacion){
    this.incidenciaService.putIncidencia(notificacion);
    this.notifications = this.notifications.filter((noti) => notificacion._id != noti._id);

  }
}
