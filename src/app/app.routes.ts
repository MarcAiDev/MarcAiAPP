import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full'
    },
    {
        path: 'intro',
        loadComponent: () => import('./pages/intro/intro.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'creator',
        loadComponent: () => import('./pages/map-creator/map-creator.component')
    }
];
