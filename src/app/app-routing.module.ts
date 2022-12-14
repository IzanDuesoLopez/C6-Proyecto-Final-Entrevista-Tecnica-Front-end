import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { CandidatesProfileComponent } from './candidates-profile/candidates-profile.component';
import { PositionDetailsComponent } from './components/position-details/position-details.component';
import { PositionListComponent } from './components/position-list/position-list.component';
import { CreatePositionComponent } from './create-position/create-position.component';
import { HrusersProfileComponent } from './hrusers-profile/hrusers-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PositionPageComponent } from './position-page/position-page.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'create-position',
    component: CreatePositionComponent
  },
  {
    path: 'search-page',
    component: SearchPageComponent
  },
  {
    path:'about-us',
    component:AboutUsComponent
  },
  {
    path:'profile',
    component:CandidatesProfileComponent
  },
  {
    path:'profile-admin',
    component:HrusersProfileComponent
  },
  {
    path:'home',
    component:LandingPageComponent
  },
  {
    path:'positions',
    component:PositionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
