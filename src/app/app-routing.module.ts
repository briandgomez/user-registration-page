import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { AuthGuardClass } from './guards/auth/auth.guard';

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
