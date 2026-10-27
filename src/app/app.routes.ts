/**
 * Angular application setup and routing configuration for the flight booking portal.
 */
import { Routes } from '@angular/router';
import { bookingGuard } from './core/guards/booking.guard';
import { confirmationGuard } from './core/guards/confirmation.guard';

/** Lazy-load each feature page to keep route definitions easy to scan. */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: 'search',
    loadComponent: () => import('./features/search/search.component').then((m) => m.SearchComponent)
  },
  {
    path: 'results',
    loadComponent: () => import('./features/results/results.component').then((m) => m.ResultsComponent)
  },
  {
    path: 'booking',
    canActivate: [bookingGuard],
    loadComponent: () => import('./features/booking/booking.component').then((m) => m.BookingComponent)
  },
  {
    path: 'confirmation',
    canActivate: [confirmationGuard],
    loadComponent: () => import('./features/confirmation/confirmation.component').then((m) => m.ConfirmationComponent)
  },
  { path: '**', redirectTo: 'search' }
];
