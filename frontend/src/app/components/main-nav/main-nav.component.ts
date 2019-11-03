import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { User } from "src/app/models/users";

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
  admin = this.logUser.source["_value"].admin;
  gestor = this.logUser.source["_value"].gestor;
  constructor(private breakpointObserver: BreakpointObserver ,
    private authService: AuthenticationService) {}


  ngOnInit() {
    this.shouldIShowMyHamburguer();
    if(this.gestor || this.admin ) {this.permisos = true};
  }

  shouldIShowMyHamburguer(){
    this.urlrn = window.location.href;
    
    if (this.urlrn.substring(this.urlrn.length - 5, this.urlrn.length) == 'login') {
      this.flag = false;
    }
  };

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

 

}
