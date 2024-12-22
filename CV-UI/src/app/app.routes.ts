import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { SiteComponent } from './shared/layouts/site/site.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
    ]
  },
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'home', component: HomeComponent, title: 'Home' }],
  },
];
