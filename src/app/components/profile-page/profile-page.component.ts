import { Component } from '@angular/core';
import { GetUserProfileService } from '../../services/user/get-user-profile.service';
import { throwError, catchError, Observable } from 'rxjs';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  userProfile: any = {}

  constructor(public profileService: GetUserProfileService) { }

  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      (data: any) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error getting user profile:', error);
      }
    )
  }
}
