import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUserProfileService {
  userProfile: any;

  constructor(public http: HttpClient) { }

  getUserProfile() {
    // GET request to the mock API
    return this.http.get('https://mocki.io/v1/611a3036-4420-48a5-b8da-9b461853cdd2')
      .pipe(
        catchError((error) => {
          console.error('An error occurred dtrying to retrieve suer data:', error);
          return throwError(() => 'Could not get user. Please try again.');
        })
      );
  }
}
