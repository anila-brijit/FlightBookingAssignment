/**
 * Unit tests for services, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { FlightService } from './flight.service';

describe('FlightService', () => {
  let service: FlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightService);
  });

  it('returns a defensive copy of the mock flight data', () => {
    const firstResult = service.getAllFlights();
    firstResult.pop();
    expect(service.getAllFlights().length).toBeGreaterThan(firstResult.length);
  });

  it('finds flights matching origin, destination, and date', () => {
    const flights = service.searchFlights({
      source: 'Chennai',
      destination: 'Paris',
      departureDate: '2026-11-10',
      roundTrip: false,
      returnDate: ''
    });
    expect(flights.length).toBe(3);
    expect(flights.every((flight) => flight.destination === 'Paris')).toBe(true);
  });

  it('returns an empty list when no flight matches', () => {
    expect(service.searchFlights({
      source: 'Chennai',
      destination: 'Tokyo',
      departureDate: '2026-11-10',
      roundTrip: false,
      returnDate: ''
    })).toEqual([]);
  });
});
