import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { User } from "src/app/models/users";

import { environment } from "src/environments/environment";
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  flag = true;
  permisos = false; //si eres admin o gestor puedes ver todo el menú
  urlrn;
  logUser = this.authService.getCurrentUser();
  constructor(private breakpointObserver: BreakpointObserver,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.shouldIShowMyHamburguer();
    if (this.logUser.source["_value"]!= null) {
      var admin = this.logUser.source["_value"].admin;
      var gestor = this.logUser.source["_value"].gestor;
      if (gestor || admin) { this.permisos = true; }
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
}
