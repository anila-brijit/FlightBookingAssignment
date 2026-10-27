/**
 * Unit tests for guards, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { bookingGuard } from './booking.guard';
import { BookingService } from '../services/booking.service';
import { Flight } from '../models/flight.model';

const flight: Flight = {
  id: 'G-1', airline: 'Test Air', flightNumber: 'TA 1',
  source: 'Chennai', destination: 'Paris', departureDate: '2026-11-10',
  departureTime: '09:00', arrivalTime: '15:00', durationMinutes: 360,
  stops: 0, price: 12000, currency: 'INR'
};

describe('bookingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), BookingService] });
  });

  it('redirects to results when no flight has been selected', () => {
    const router = TestBed.inject(Router);
    const result = TestBed.runInInjectionContext(() => bookingGuard({} as never, {} as never));

    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result as UrlTree)).toBe('/results');
  });

  it('allows checkout when a flight is selected', () => {
    TestBed.inject(BookingService).selectFlight(flight);
    const result = TestBed.runInInjectionContext(() => bookingGuard({} as never, {} as never));

    expect(result).toBe(true);
  });
});
