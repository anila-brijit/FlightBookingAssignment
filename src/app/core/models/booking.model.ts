/**
 * TypeScript model definitions for booking model data.
 */
import { Flight } from './flight.model';

/** Passenger information collected during checkout. */
export interface PassengerDetails {
  fullName: string;
  email: string;
  phone: string;
  passengers:number;

}

/** A confirmed booking in this demo's in-memory store. */
export interface Booking {
  reference: string;
  flight: Flight;
  passenger: PassengerDetails;
  returnDate: string;
  /** Passenger count used to calculate the total fare. */
  passengers: number;
  createdAt: string;
}
