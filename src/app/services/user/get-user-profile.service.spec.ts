import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GetUserProfileService } from './get-user-profile.service';

describe('GetUserProfileService', () => {
    let service: GetUserProfileService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GetUserProfileService],
        });

        service = TestBed.inject(GetUserProfileService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should creat get user profile service', () => {
        expect(service).toBeTruthy();
    });

    it('should get user profile data', () => {
        const mockData = {
            name: 'Lebron James',
            email: 'kingjames@google.com',
            bio: 'King james bio.',
            img: 'https://tinyurl.com/2p9953zy'
        };
        service.getUserProfile().subscribe((data) => {
            expect(data).toEqual(mockData);
        });

        const req = httpTestingController.expectOne('https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2');
        expect(req.request.method).toBe('GET');

        req.flush(mockData);
    });

    it('should handle errors when getting user profile data', () => {
        const errorMessage = 'Error';
        service.getUserProfile().subscribe(
            () => {
                fail('Expected an error, but got a successful response');
            },
            (error) => {
                expect(error).toBe('Could not get user. Please try again.');
            }
        );

        const req = httpTestingController.expectOne('https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2');
        expect(req.request.method).toBe('GET');

        req.error(new ErrorEvent('error', { message: errorMessage }));
    });
});
