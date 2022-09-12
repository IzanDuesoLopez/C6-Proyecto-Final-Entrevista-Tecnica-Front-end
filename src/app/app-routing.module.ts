import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CandidatesProfileComponent } from './candidates-profile/candidates-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {
    path:'aboutus',
    component:AboutUsComponent
  },
  {
    path:'profile',
    component:CandidatesProfileComponent
  },
  {
    path:'home',
    component:LandingPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
