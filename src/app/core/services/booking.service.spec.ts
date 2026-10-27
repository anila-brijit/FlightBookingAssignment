/**
 * Unit tests for services, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { Flight } from '../models/flight.model';

const sampleFlight: Flight = {
  id: 'T1', airline: 'Demo Air', flightNumber: 'DA 101',
  source: 'Chennai', destination: 'Paris', departureDate: '2026-11-10',
  departureTime: '09:00', arrivalTime: '15:00', durationMinutes: 360,
  stops: 0, price: 12000, currency: 'INR'
};

describe('BookingService', () => {
  let service: BookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
  });

  it('creates a booking after a flight is selected', () => {
    service.setSearchCriteria({
      source: 'Chennai', destination: 'Paris', departureDate: '2026-11-10',
      roundTrip: false, returnDate: ''
    });
    service.selectFlight(sampleFlight);
    const booking = service.createBooking({
      fullName: 'Anila Brijit Mary', email: 'anila@example.com', phone: '9876543210',passengers:2
    });

    expect(booking?.reference).toContain('FB-');
    expect(booking?.flight.id).toBe('T1');
  });

  it('does not create a booking when no flight is selected', () => {
    expect(service.createBooking({
      fullName: 'Anila Brijit Mary', email: 'anila@example.com', phone: '9876543210',passengers:2
    })).toBeNull();
  });
});
