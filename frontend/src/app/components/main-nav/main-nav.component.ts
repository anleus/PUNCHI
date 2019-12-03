import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { User } from "src/app/models/users";

import { environment } from "src/environments/environment";
import { MatSidenav } from '@angular/material/sidenav';
import { Incidencia } from 'src/app/models/incidencia';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  flag = true;
  permisos = false; //si eres admin o gestor puedes ver todo el menú
  permisosSoloAdmin= false; // si eres admin puedes crear usuarios
  urlrn;
  loggedUser: User;
  notifications: Incidencia[];
  NewAlerts: Boolean;
  logUser = this.authService.getCurrentUser();
  private notifier: NotifierService;
  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService, private incidenciaService: IncidenciaService, notifier: NotifierService) { 
      this.notifier = notifier;
    }

  ngOnInit() {
    this.shouldIShowMyHamburguer();
    this.authService.getCurrentUser().subscribe((res: User) => {
    this.loggedUser = res;
    
    this.incidenciaService.getIncidenciaByUserId(this.loggedUser._id).subscribe((res: Incidencia[])=> {
      this.notifications = res;
      console.log(res)
      console.log(this.notifications.length)
      this.NewAlerts = this.notifications.length != 0;
    })
    });
    if (this.logUser.source["_value"]!= null) {
      var admin = this.logUser.source["_value"].admin;
      var gestor = this.logUser.source["_value"].gestor;
      if (gestor) { this.permisos = true; }
      else if(admin){
        this.permisosSoloAdmin=true;
        this.permisos=true;}
      else { this.permisos = false; }
    } else {
      this.permisos = false;
    }
  }

  shouldIShowMyHamburguer() {
    this.urlrn = window.location.href;
    if (this.urlrn.substring(this.urlrn.length - 5, this.urlrn.length) == 'login') {
      this.flag = false;
    }
  };
  showNotifications(){
    
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    logoutUser() {
      this.authService.logout();
    }

    	/**
	 * Show a notification
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 */
	public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

	/**
	 * Hide oldest notification
	 */
	public hideOldestNotification(): void {
		this.notifier.hideOldest();
	}

	/**
	 * Hide newest notification
	 */
	public hideNewestNotification(): void {
		this.notifier.hideNewest();
	}

	/**
	 * Hide all notifications at once
	 */
	public hideAllNotifications(): void {
		this.notifier.hideAll();
	}

	/**
	 * Show a specific notification (with a custom notification ID)
	 *
	 * @param {string} type    Notification type
	 * @param {string} message Notification message
	 * @param {string} id      Notification ID
	 */
	public showSpecificNotification( type: string, message: string, id: string ): void {
		this.notifier.show( {
			id,
			message,
			type
		} );
	}

	/**
	 * Hide a specific notification (by a given notification ID)
	 *
	 * @param {string} id Notification ID
	 */
	public hideSpecificNotification( id: string ): void {
		this.notifier.hide( id );
	}
}
