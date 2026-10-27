/**
 * Unit tests for booking, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { BookingComponent } from './booking.component';
import { BookingService } from '../../core/services/booking.service';
import { Flight } from '../../core/models/flight.model';

const testFlight: Flight = {
  id: 'BOOK-1',
  airline: 'Example Air',
  flightNumber: 'EA 100',
  source: 'Chennai',
  destination: 'Paris',
  departureDate: '2026-11-10',
  departureTime: '09:00',
  arrivalTime: '15:00',
  durationMinutes: 360,
  stops: 0,
  price: 12000,
  currency: 'INR'
};

describe('BookingComponent', () => {
  let bookingService: BookingService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookingComponent],
      providers: [provideRouter([]), BookingService]
    });
    bookingService = TestBed.inject(BookingService);
    router = TestBed.inject(Router);
  });

  function createComponent() {
    bookingService.setSearchCriteria({
      source: 'Chennai',
      destination: 'Paris',
      departureDate: '2026-11-10',
      roundTrip: false,
      returnDate: ''
    });
    bookingService.selectFlight(testFlight);
    const fixture = TestBed.createComponent(BookingComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('shows the passenger form with passenger count selected on the booking page', () => {
    const fixture = createComponent();

    expect(fixture.nativeElement.textContent).toContain('Passenger details');
    expect(fixture.componentInstance.passengerForm.controls.passengers.value).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('#passengers option').length).toBe(9);
  });

  it('updates the displayed total fare when passenger count changes', () => {
    const fixture = createComponent();

    fixture.componentInstance.passengerForm.controls.passengers.setValue(3);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('₹36,000');
  });

  it('creates a booking and navigates to confirmation when the form is valid', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = createComponent();
    fixture.componentInstance.passengerForm.setValue({
      fullName: 'Anila Brijit Mary',
      email: 'anila@example.com',
      phone: '9876543210',
      passengers: 3
    });

    fixture.componentInstance.submitBooking();

    expect(bookingService.getBooking()?.passengers).toBe(3);
    expect(navigateSpy).toHaveBeenCalledWith(['/confirmation']);
  });

  it('does not submit an invalid passenger form', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = createComponent();

    fixture.componentInstance.passengerForm.controls.email.setValue('not-an-email');
    fixture.componentInstance.submitBooking();

    expect(bookingService.getBooking()).toBeNull();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
