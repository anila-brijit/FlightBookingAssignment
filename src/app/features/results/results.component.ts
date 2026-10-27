/**
 * Angular component that implements the results page or shared UI.
 */
import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Flight } from '../../core/models/flight.model';
import { FlightService } from '../../core/services/flight.service';
import { BookingService } from '../../core/services/booking.service';
import { FlightCardComponent } from '../../shared/flight-card/flight-card.component';
import { DepartureSlot, FilterSidebarComponent, FlightSort } from '../../shared/filter-sidebar/filter-sidebar.component';

/** Displays matching flights and applies the selected airline, departure-slot, and sort settings. */
@Component({
  selector: 'app-results',
  standalone: true,
  imports: [DatePipe, FlightCardComponent, FilterSidebarComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  private readonly flightService = inject(FlightService);
  private readonly bookingService = inject(BookingService);
  private readonly router = inject(Router);

  readonly criteria = this.bookingService.getSearchCriteria();
  readonly sortBy = signal<FlightSort>('price-asc');
  readonly selectedAirlines = signal<string[]>([]);
  readonly selectedSlots = signal<DepartureSlot[]>([]);
  readonly flights = signal<Flight[]>(this.criteria ? this.flightService.searchFlights(this.criteria) : []);
  readonly airlines = computed(() => [...new Set(this.flights().map(f => f.airline))].sort());

  /** Filter first, then sort a copy so the mock data is never mutated. */
  readonly visibleFlights = computed(() => {
    let items = [...this.flights()];
    if (this.selectedAirlines().length) items = items.filter(f => this.selectedAirlines().includes(f.airline));
    if (this.selectedSlots().length) {
      items = items.filter(f => this.selectedSlots().some(slot => {
        const hour = Number(f.departureTime.slice(0, 2));
        return slot === 'morning' ? hour < 12 : slot === 'afternoon' ? hour >= 12 && hour < 18 : hour >= 18;
      }));
    }
    return items.sort((a, b) => {
      switch (this.sortBy()) {
        case 'price-desc': return b.price - a.price;
        case 'duration-asc': return a.durationMinutes - b.durationMinutes;
        case 'duration-desc': return b.durationMinutes - a.durationMinutes;
        case 'price-asc':
        default: return a.price - b.price;
      }
    });
  });

  chooseFlight(flight: Flight): void {
    this.bookingService.selectFlight(flight);
    void this.router.navigate(['/booking']);
  }
  changeSearch(): void { void this.router.navigate(['/search']); }
}
