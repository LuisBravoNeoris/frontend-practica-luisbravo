import { UnauthorizedComponent } from './pages/unauthorized/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './pages/pagenotfound/page-not-found/page-not-found.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './services/guards/admin.guard';
import { LoggedGuard } from './services/guards/logged.guard';
import { RouteChangeGuard } from './services/guards/route-change.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canActivate:[AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  }, {
    path: 'admin',
    component: AdminDashboardComponent,
    pathMatch: 'full',
    canActivate:[AdminGuard]
  }, {
    path: 'dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate:[LoggedGuard]
  }, {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate:[LoggedGuard]
  }, {
    path: 'edit',
    component: EditComponent,
    pathMatch: 'full',
    canDeactivate: [RouteChangeGuard] 
  },

  // 404
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
