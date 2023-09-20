import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from "@angular/router";
import {Observable, tap, map} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({providedIn:'root'})
export class PublicGuard implements CanActivate, CanMatch{

  constructor( private authService : AuthService,
               private router: Router) { }

  private chechAuthStatus() : boolean | Observable<boolean> {
    return this.authService.checkAuthenticantion()
      .pipe(
        tap( isAuthenticated => {
          if(isAuthenticated){
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated =>!isAuthenticated)
      )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.chechAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.chechAuthStatus();
  }
}
