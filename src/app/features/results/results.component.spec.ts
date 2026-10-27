/**
 * Unit tests for results, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ResultsComponent } from './results.component';
import { BookingService } from '../../core/services/booking.service';
import { FlightService } from '../../core/services/flight.service';

describe('ResultsComponent', () => {
  let bookingService: BookingService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ResultsComponent], providers: [provideRouter([]), BookingService, FlightService] });
    bookingService = TestBed.inject(BookingService);
    router = TestBed.inject(Router);
    bookingService.setSearchCriteria({ source: 'Chennai', destination: 'Paris', departureDate: '2026-11-10', roundTrip: false, returnDate: '' });
  });

  it('shows matching flights and reusable cards', () => {
    const fixture = TestBed.createComponent(ResultsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleFlights().length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('app-flight-card').length).toBe(3);
  });

  it('filters by airline and departure time slot', () => {
    const fixture = TestBed.createComponent(ResultsComponent);
    const component = fixture.componentInstance;
    component.selectedAirlines.set(['Emirates']);
    expect(component.visibleFlights().every(f => f.airline === 'Emirates')).toBe(true);
    component.selectedAirlines.set([]);
    component.selectedSlots.set(['evening']);
    expect(component.visibleFlights().every(f => Number(f.departureTime.slice(0, 2)) >= 18)).toBe(true);
  });

  it('sorts by duration', () => {
    const component = TestBed.createComponent(ResultsComponent).componentInstance;
    component.sortBy.set('duration-asc');
    const list = component.visibleFlights();
    expect(list[0].durationMinutes).toBeLessThanOrEqual(list[1].durationMinutes);
    component.sortBy.set('duration-desc');
    expect(component.visibleFlights()[0].durationMinutes).toBeGreaterThanOrEqual(component.visibleFlights()[1].durationMinutes);
    component.sortBy.set('price-desc');
    expect(component.visibleFlights()[0].price).toBeGreaterThanOrEqual(component.visibleFlights()[1].price);
  });

  it('selects a flight and navigates to booking', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const component = TestBed.createComponent(ResultsComponent).componentInstance;
    const flight = component.visibleFlights()[0];
    component.chooseFlight(flight);
    expect(bookingService.selectedFlight()?.id).toBe(flight.id);
    expect(navigateSpy).toHaveBeenCalledWith(['/booking']);
  });
});
