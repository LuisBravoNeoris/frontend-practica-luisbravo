import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';


import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authInterceptorProvider } from './services/login/auth.interceptor';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { PageNotFoundComponent } from './pages/pagenotfound/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized/unauthorized.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule,
        MatGridListModule,
        MatRippleModule,
        NavbarComponent,
        SignupComponent,
        LoginComponent,
        HomeComponent,
        AdminDashboardComponent,
        UserDashboardComponent,
        PageNotFoundComponent,
        UnauthorizedComponent,
        ProfileComponent,
        UserListComponent,
        EditComponent], providers: [authInterceptorProvider, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
