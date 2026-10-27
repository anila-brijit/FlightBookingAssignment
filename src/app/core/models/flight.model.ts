/**
 * Describes one mock flight leg returned by the flight search service.
 */
export interface Flight {
  /** Stable identifier used by the UI and booking flow. */
  id: string;
  airline: string;
  flightNumber: string;
  source: string;
  destination: string;
  /** ISO date in YYYY-MM-DD format. */
  departureDate: string;
  /** Local time in HH:mm format. */
  departureTime: string;
  arrivalTime: string;
  /** Flight duration represented as total minutes. */
  durationMinutes: number;
  /** Number of connections; zero means non-stop. */
  stops: number;
  price: number;
  currency: string;
}
