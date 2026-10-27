/**
 * Angular component that implements the search page or shared UI.
 */
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';

/** Search form and navigation entry point for the booking journey. */
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);

  /** Minimum selectable date prevents searching for a date in the past. */
  readonly today = new Date().toISOString().slice(0, 10);

  /** Reactive form centralizes field values and validation rules. */
  readonly searchForm = this.formBuilder.nonNullable.group({
    source: ['Chennai', [Validators.required]],
    destination: ['Paris', [Validators.required]],
    departureDate: ['2026-11-10', [Validators.required]],
    roundTrip: [false],
    returnDate: [''],
  });

  /** Require a different return date only when round-trip is selected. */
  submitSearch(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const value = this.searchForm.getRawValue();
    if (value.source.trim().toLowerCase() === value.destination.trim().toLowerCase()) {
      this.searchForm.controls.destination.setErrors({ sameCity: true });
      return;
    }
    if (value.roundTrip && (!value.returnDate || value.returnDate < value.departureDate)) {
      this.searchForm.controls.returnDate.setErrors({ invalidReturnDate: true });
      return;
    }

    this.bookingService.setSearchCriteria({
      ...value,
      source: value.source.trim(),
      destination: value.destination.trim(),
      returnDate: value.roundTrip ? value.returnDate : ''
    });
    void this.router.navigate(['/results']);
  }
}
