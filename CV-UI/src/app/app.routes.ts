import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/welcome', pathMatch: 'full'
    },
    {
        path: 'welcome', component: WelcomeComponent
    },
    {
        path: 'login', component: LoginPageComponent
    }

];
