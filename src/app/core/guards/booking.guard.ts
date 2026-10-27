/**
 * Route guard that controls access to the booking guard route.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

/** Prevent direct navigation to checkout unless a flight was selected. */
export const bookingGuard: CanActivateFn = () => {
  const bookingService = inject(BookingService);
  const router = inject(Router);

  return bookingService.selectedFlight() ? true : router.createUrlTree(['/results']);
};
