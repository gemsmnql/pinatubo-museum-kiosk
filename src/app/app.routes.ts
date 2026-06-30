import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page';
import { ButtonPage } from './button-page/button-page';
import { VideoPage } from './video-page/video-page';

export const routes: Routes = [
    { path: '', component: WelcomePage },
    { path: 'menu', component: ButtonPage },
    { path: 'videos', component: VideoPage},
];
