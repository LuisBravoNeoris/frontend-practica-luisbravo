import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RouteChangeGuard  {
  
  constructor(private loginService:LoginService){}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: any,
    currentState: any,
    nextState?: any
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isLoggedIn() && currentState.url === '/edit' && nextState.url !== '/edit') {
      localStorage.removeItem('usertmp');
    }
    return true;
  }
}
