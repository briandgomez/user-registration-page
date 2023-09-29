import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  private apiURL = 'https://mocki.io/v1/7f434df6-a4ac-4817-ab7c-dd39a564d01d';

  constructor(private http: HttpClient) { }

  validateInput(inputData: any): Observable<any> {
    return this.http.post(this.apiURL, inputData);
  }
}
