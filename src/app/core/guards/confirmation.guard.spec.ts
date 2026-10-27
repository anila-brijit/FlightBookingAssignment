/**
 * Unit tests for guards, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { confirmationGuard } from './confirmation.guard';
import { BookingService } from '../services/booking.service';

describe('confirmationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), BookingService] });
  });

  it('redirects to search when there is no confirmed booking', () => {
    const router = TestBed.inject(Router);
    const result = TestBed.runInInjectionContext(() => confirmationGuard({} as never, {} as never));

    expect(result instanceof UrlTree).toBe(true);
    expect(router.serializeUrl(result as UrlTree)).toBe('/search');
  });
});
