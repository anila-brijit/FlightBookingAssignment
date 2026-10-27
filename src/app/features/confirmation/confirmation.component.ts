/**
 * Angular component that implements the confirmation page or shared UI.
 */
import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';

/** Read-only summary of a successfully created demo booking. */
@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})
export class ConfirmationComponent {
  /** Route guard ensures booking exists before this component is activated. */
  readonly booking = inject(BookingService).getBooking();
}
