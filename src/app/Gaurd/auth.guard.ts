import { Injectable } from '@angular/core';
import { CanActivate, Router,  CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginUser: any;
  constructor(private router: Router) {
	}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('loginUser')) { // logged in so return true
        this.loginUser = localStorage.getItem('loginUser');
        return true;
      } else {
        this.router.navigate(['/login'], { queryParams: {
					ver: Math.random().toString(36).substr(2, 5),
					nocache: 1
				}});
        localStorage.clear();
        return false;
      }
      return true;
  }

  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
