import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuardClass} from './auth.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/services/auth/auth.service';

describe('AuthGuardClass', () => {
  let authGuard: AuthGuardClass;
  let authService: AuthenticationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthGuardClass,
        AuthenticationService,
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        },
      ]
    });

    authGuard = TestBed.inject(AuthGuardClass);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
  });

  it('should create guard', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow access if authentication service returns true', () => {
    spyOn(authService, 'validateInputFields').and.returnValue(of(true));

    const canActivate = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    canActivate.subscribe((result) => {
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should redirect to registration page if authentication service returns false', () => {
    spyOn(authService, 'validateInputFields').and.returnValue(of(false));

    const canActivate = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    canActivate.subscribe((result) => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/registration']);
    });
  });
});