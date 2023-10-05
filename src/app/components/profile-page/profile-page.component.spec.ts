import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePageComponent } from './profile-page.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { GetUserProfileService } from '../../services/user/get-user-profile.service';
import { of } from 'rxjs';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePageComponent],
      imports: [MatCardModule, HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;

    const mockUserProfile = {
      name: 'King Julien',
      email: 'kingj@email.com',
      bio: 'Hi my name is King Julien and I like to move it move it.'
    };
    const getUserProfileService = TestBed.inject(GetUserProfileService);
    spyOn(getUserProfileService, 'getUserProfile').and.returnValue(of(mockUserProfile));

    fixture.detectChanges();
  });

  it('should create the profile page component', () => {
    expect(component).toBeTruthy();
  });

  it('display user profile name', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('#name');
    expect(nameElement.textContent).toContain('King Julien');
  });

  it('display user profile email', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('#email');
    expect(nameElement.textContent).toContain('kingj@email.com');
  });

  it('display user profile bio', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('#bio');
    expect(nameElement.textContent).toContain('Hi my name is King Julien and I like to move it move it.');
  });

  it('should display the correct title in <h1>', () => {
    const expectedTitle = 'User Profile';
    fixture.detectChanges();

    const h1Element: HTMLElement = fixture.nativeElement.querySelector('h1');
    expect(h1Element.textContent).toContain(expectedTitle);
  })
});
