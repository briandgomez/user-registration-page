import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [ReactiveFormsModule, MatFormFieldModule, FormsModule, MatInputModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([])]
    }).compileComponents()
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty input fields', () => {
    fixture.detectChanges();
    expect(component.registrationForm.value).toEqual({
      name: '',
      email: '',
      password: '',
      bio: ''
    });
  });

  it('should be invalid when input is empty', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should mark the form as valid when all the input fields have been filled correctly', () => {
    const nameControl = component.registrationForm.get('name');
    nameControl?.setValue('Brian Gomez');

    const emailControl = component.registrationForm.get('email');
    emailControl?.setValue('brian@gmail.com');

    const passwordControl = component.registrationForm.get('password');
    passwordControl?.setValue('passwordtext');

    const bioControl = component.registrationForm.get('bio');
    bioControl?.setValue('Bio test text.');

    expect(nameControl?.valid).toBeTruthy();
    expect(emailControl?.valid).toBeTruthy();
    expect(passwordControl?.valid).toBeTruthy();
    expect(bioControl?.valid).toBeTruthy();

    expect(component.registrationForm.valid).toBeTruthy();
  });

  it('should mark the form as invalid when any field is filled empty', () => {
    const nameControl = component.registrationForm.get('name');
    nameControl?.setValue('Johnathan Churchill');

    const emailControl = component.registrationForm.get('email');
    emailControl?.setValue('john@yahoo.com');

    const passwordControl = component.registrationForm.get('password');
    passwordControl?.setValue('newpassword123');

    const bioControl = component.registrationForm.get('bio');
    bioControl?.setValue('');

    expect(component.registrationForm.valid).toBeFalsy();
  });
}); 