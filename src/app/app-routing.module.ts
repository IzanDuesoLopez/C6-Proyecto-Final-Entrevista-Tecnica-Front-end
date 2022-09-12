import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePositionComponent } from './create-position/create-position.component';
import { LoginComponent } from './login/login.component';
import { PositionPageComponent } from './position-page/position-page.component';
import { RegisterComponent } from './register/register.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
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
    path: 'position',
    component: PositionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
