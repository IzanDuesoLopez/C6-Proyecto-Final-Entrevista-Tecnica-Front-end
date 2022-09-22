import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CandidatesProfileComponent } from './candidates-profile/candidates-profile.component';
import { HrusersProfileComponent } from './hrusers-profile/hrusers-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PositionPageComponent } from './position-page/position-page.component';
import { CreatePositionComponent } from './create-position/create-position.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PositionListComponent } from './components/position-list/position-list.component';
import { PositionDetailsComponent } from './components/position-details/position-details.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    CandidatesProfileComponent,
    HrusersProfileComponent,
    RegisterComponent,
    LoginComponent,
    SearchPageComponent,
    PositionPageComponent,
    CreatePositionComponent,
    AboutUsComponent,
    PositionListComponent,
    PositionDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [
    DatePipe,
    {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
