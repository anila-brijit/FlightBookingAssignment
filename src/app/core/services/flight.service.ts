/**
 * Service responsible for flight service application logic and shared data access.
 */
import { Injectable } from '@angular/core';
import { Flight } from '../models/flight.model';
import { SearchCriteria } from '../models/search-criteria.model';
import flightsData from '../../../assets/flights.json';

/**
 * Provides flight data and keeps search matching separate from page components.
 * The JSON file is mock data; a real application would call an API here.
 */
@Injectable({ providedIn: 'root' })
export class FlightService {
  /** Return a copy so callers cannot mutate the imported mock dataset. */
  getAllFlights(): Flight[] {
    return (flightsData as Flight[]).map((flight) => ({ ...flight }));
  }

  /** Match origin, destination, and departure date without case sensitivity. */
  searchFlights(criteria: SearchCriteria): Flight[] {
    const source = criteria.source.trim().toLocaleLowerCase();
    const destination = criteria.destination.trim().toLocaleLowerCase();

    return this.getAllFlights().filter((flight) =>
      flight.source.toLocaleLowerCase() === source &&
      flight.destination.toLocaleLowerCase() === destination &&
      flight.departureDate === criteria.departureDate
    );
  }
}
