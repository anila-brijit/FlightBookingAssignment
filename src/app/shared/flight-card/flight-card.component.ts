/**
 * Angular component that implements the flight-card page or shared UI.
 */
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Flight } from '../../core/models/flight.model';

/** Reusable presentation component for one flight result. */
@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.scss'
})
export class FlightCardComponent {
  /** Flight displayed by this card. */
  readonly flight = input.required<Flight>();
  /** Emits the selected flight; the parent decides what happens next. */
  readonly select = output<Flight>();

  /** Notify the parent when the user chooses this flight. */
  selectFlight(): void {
    this.select.emit(this.flight());
  }
}
