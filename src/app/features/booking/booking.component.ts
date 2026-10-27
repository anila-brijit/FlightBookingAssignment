/**
 * Angular component that implements the booking page or shared UI.
 */
import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';

/** Passenger checkout form with typed Reactive Forms validation. */
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  private readonly formBuilder = inject(FormBuilder);
  readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  /** The guard normally guarantees a flight exists; keep a safe template fallback too. */
  readonly flight = this.bookingService.selectedFlight();

  /** Define all passenger validation in one place for easy maintenance. */
  readonly passengerForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]{8,18}$/)]],
    passengers: [1, [Validators.required, Validators.min(1), Validators.max(9)]]
  });

  /** Validate and save the booking before navigating to confirmation. */
  submitBooking(): void {
    if (this.passengerForm.invalid || !this.flight) {
      this.passengerForm.markAllAsTouched();
      return;
    }

    const formValue = this.passengerForm.getRawValue();
    const booking = this.bookingService.createBooking({
      fullName: formValue.fullName,
      email: formValue.email,
      phone: formValue.phone,
      passengers: formValue.passengers
    });
    if (booking) {
      void this.router.navigate(['/confirmation']);
    }
  }
}
