/**
 * Unit tests for confirmation, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConfirmationComponent } from './confirmation.component';
import { BookingService } from '../../core/services/booking.service';
import { Flight } from '../../core/models/flight.model';

const testFlight: Flight = {
  id: 'TEST-1',
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

describe('ConfirmationComponent', () => {
  it('renders the booking reference, passenger count, and total fare', async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationComponent],
      providers: [provideRouter([]), BookingService]
    }).compileComponents();

    const bookingService = TestBed.inject(BookingService);
    bookingService.setSearchCriteria({
      source: 'Chennai',
      destination: 'Paris',
      departureDate: '2026-11-10',
      roundTrip: false,
      returnDate: ''
    });
    bookingService.selectFlight(testFlight);
    bookingService.createBooking({
      fullName: 'Anila Brijit Mary',
      email: 'anila@example.com',
      phone: '9876543210',
      passengers:2
    });

    const fixture = TestBed.createComponent(ConfirmationComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Booking confirmed');
    expect(fixture.nativeElement.textContent).toContain('Anila Brijit Mary');
    expect(fixture.nativeElement.textContent).toContain('2');
    expect(fixture.nativeElement.textContent).toContain('₹24,000');
  });
});
