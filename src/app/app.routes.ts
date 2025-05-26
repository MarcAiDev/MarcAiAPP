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
    },
    {
        path: 'perfil',
        loadComponent: () => import('./pages/profile/profile.component')
    },
    {
        path: 'info',
        loadComponent: () => import('./pages/description/description.component')
    },
    {
        path: 'map',
        loadComponent: () => import('./pages/map/map.component')
    },
    {
        path: 'market',
        loadComponent: () => import('./pages/market-info/market-info.component')
    },
    {
        path: 'market-stores',
        loadComponent: () => import('./pages/market-stores/market-stores.component')
    },
    {
        path: 'addStore',
        loadComponent: () => import('./pages/add-store/add-store.component')
    },
];
