/**
 * User-entered criteria used to find matching mock flights.
 */
export interface SearchCriteria {
  source: string;
  destination: string;
  departureDate: string;
  roundTrip: boolean;
  returnDate: string;
}
