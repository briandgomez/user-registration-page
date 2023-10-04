import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegistrationComponent } from './registration/registration.component';

import { AuthGuardClass } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/registration', pathMatch: 'full' },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardClass] },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardClass]
})
export class AppRoutingModule { }
