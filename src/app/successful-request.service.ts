import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SuccessfulRequestService {
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  validateInputFields(): void {

    // GET request to the mock API
    this.http.get('https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d')
      .pipe(
        catchError((error) => {
          console.error('An error occurred during validation:', error);
          return throwError(() => 'Validation failed. Please try again.');
        })
      )
      .subscribe((response: any) => {
        // Successful response
        if (response.success === true) {
          this.successMessage = 'Registration was successful!';
          console.log(this.successMessage);
        } else {
          this.successMessage = 'Registration failed.';
          console.log(this.successMessage);
        }
      });
  }
}
