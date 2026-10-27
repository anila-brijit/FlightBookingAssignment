/**
 * Route guard that controls access to the confirmation guard route.
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

/** A confirmation URL is available only after a booking has been created. */
export const confirmationGuard: CanActivateFn = () => {
  const bookingService = inject(BookingService);
  const router = inject(Router);

  return bookingService.getBooking() ? true : router.createUrlTree(['/search']);
};
