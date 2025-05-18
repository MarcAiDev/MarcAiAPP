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
        path: 'cadastro',
        loadComponent: () => import('./pages/register/register.component')
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    }
];
