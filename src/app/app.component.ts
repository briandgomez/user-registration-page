import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ValidationService } from './validation.service';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError, Observable } from 'rxjs';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  successMessage: string = '';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

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
