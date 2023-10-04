import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthenticationService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardClass {
  constructor(private authenticateService: AuthenticationService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticateService.validateInputFields().pipe(map((response) => {
      if (response) {
        return true;
      }
      this.router.navigate(['/registration']);
      return false;
    }), catchError((error: any) => {
      this.router.navigate(['/registration']);
      return of(false);
    }));
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(AuthGuardClass).canActivate(next, state);
}