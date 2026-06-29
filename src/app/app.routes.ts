import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page';
import { ButtonPage } from './button-page/button-page';

export const routes: Routes = [
    { path: '', component: WelcomePage },
    { path: 'menu', component: ButtonPage }
];
