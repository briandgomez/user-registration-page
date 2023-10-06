import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './auth.service';

describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthenticationService],
        });
        service = TestBed.inject(AuthenticationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create authentication service', () => {
        expect(service).toBeTruthy();
    });

    it('should validate input fields and return data', inject(
        [AuthenticationService],
        (authService: AuthenticationService) => {
            const mockResponse = { data: 'dummy data' };

            authService.validateInputFields().subscribe((response: any) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d');
            expect(req.request.method).toBe('GET');

            req.flush(mockResponse);
        }
    ));
});
