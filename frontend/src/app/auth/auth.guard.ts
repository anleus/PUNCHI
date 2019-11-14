import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService : AuthenticationService,
              private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log("AuthGuard - canActivate called");

      let url: string = state.url;

      return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (localStorage.getItem('isLoggedin')) {
      return true;
    } else {
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
