import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SuccessfulRequestService {
  successMessage: string = '';

  constructor(private http: HttpClient) { }

  validateInputFields():any {

    // GET request to the mock API
    return this.http.get('https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d');
  }
}
