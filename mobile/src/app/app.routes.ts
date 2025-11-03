import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'matches',
    loadComponent: () => import('./pages/matches/matches.page').then( m => m.MatchesPage)
  },
  {
    path: 'report-result/:id',
    loadComponent: () => import('./pages/report-result/report-result.page').then( m => m.ReportResultPage)
  },
];
