import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'intro',
        redirectTo: 'intro',
        pathMatch: 'full'
    },
    {
        path: '',
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
        path: 'info/:id',
        loadComponent: () => import('./pages/description/description.component').then(m => m.default)
    },
    {
        path: 'map',
        loadComponent: () => import('./pages/map/map.component')
    },
    {
        path: 'descricao-feira/:id',
        loadComponent: () => import('./pages/market-info/market-info.component')
    },
    {
        path: 'market-stores/:id',
        loadComponent: () => import('./pages/market-stores/market-stores.component').then((m) => m.default),
    },
    {
        path: 'addStore',
        loadComponent: () => import('./pages/add-store/add-store.component')
    },
];
