/**
 * Angular component that implements the filter-sidebar page or shared UI.
 */
import { Component, input, output } from '@angular/core';

export type FlightSort = 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc';
export type DepartureSlot = 'morning' | 'afternoon' | 'evening';

/** Reusable sidebar for airline and departure-time filters plus price/duration sorting. */
@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss'
})
export class FilterSidebarComponent {
  readonly airlines = input.required<string[]>();
  readonly selectedAirlines = input.required<string[]>();
  readonly selectedSlots = input.required<DepartureSlot[]>();
  readonly sortBy = input<FlightSort>('price-asc');

  readonly airlinesChange = output<string[]>();
  readonly slotsChange = output<DepartureSlot[]>();
  readonly sortChange = output<FlightSort>();

  toggleAirline(airline: string, checked: boolean): void {
    const next = new Set(this.selectedAirlines());
    checked ? next.add(airline) : next.delete(airline);
    this.airlinesChange.emit([...next]);
  }

  toggleSlot(slot: DepartureSlot, checked: boolean): void {
    const next = new Set(this.selectedSlots());
    checked ? next.add(slot) : next.delete(slot);
    this.slotsChange.emit([...next]);
  }

  isAirlineSelected(airline: string): boolean { return this.selectedAirlines().includes(airline); }
  isSlotSelected(slot: DepartureSlot): boolean { return this.selectedSlots().includes(slot); }
}
