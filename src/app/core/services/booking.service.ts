/**
 * Service responsible for booking service application logic and shared data access.
 */
import { Injectable, signal } from '@angular/core';
import { Booking, PassengerDetails } from '../models/booking.model';
import { Flight } from '../models/flight.model';
import { SearchCriteria } from '../models/search-criteria.model';

/**
 * Holds the short-lived search and booking state shared between route pages.
 * Signals keep reads reactive; data intentionally remains in memory for this demo.
 */
@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly criteriaState = signal<SearchCriteria | null>(null);
  private readonly selectedFlightState = signal<Flight | null>(null);
  private readonly bookingState = signal<Booking | null>(null);

  /** Read the latest criteria, or null before the first search. */
  getSearchCriteria(): SearchCriteria | null {
    return this.criteriaState();
  }

  /** Save search criteria and invalidate any stale selection/confirmation. */
  setSearchCriteria(criteria: SearchCriteria): void {
    this.criteriaState.set({ ...criteria });
    this.selectedFlightState.set(null);
    this.bookingState.set(null);
  }

  /** Expose the selected flight as a signal for consumers that need reactivity. */
  selectedFlight = this.selectedFlightState.asReadonly();

  /** Store a copy of the flight chosen from the results list. */
  selectFlight(flight: Flight): void {
    this.selectedFlightState.set({ ...flight });
    this.bookingState.set(null);
  }

  /** Return the latest booking; null means the user has not completed checkout. */
  getBooking(): Booking | null {
    return this.bookingState();
  }

  /** Create a local booking reference and save passenger/flight details. */
  createBooking(passenger: PassengerDetails): Booking | null {
    const flight = this.selectedFlightState();
    if (!flight) {
      return null;
    }

    const criteria = this.criteriaState();
    const booking: Booking = {
      reference: `FB-${Date.now().toString(36).toUpperCase()}`,
      flight,
      passenger: { ...passenger },
      returnDate: criteria?.roundTrip ? criteria.returnDate : '',
      passengers: passenger.passengers ?? 1,
      createdAt: new Date().toISOString()
    };
    this.bookingState.set(booking);
    return booking;
  }

  /** Clear the journey state, for example when starting a new search. */
  clear(): void {
    this.criteriaState.set(null);
    this.selectedFlightState.set(null);
    this.bookingState.set(null);
  }
}
