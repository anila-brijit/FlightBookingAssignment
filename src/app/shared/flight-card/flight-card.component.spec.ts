/**
 * Unit tests for flight-card, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { FlightCardComponent } from './flight-card.component';
import { Flight } from '../../core/models/flight.model';

const flight: Flight = {
  id: 'T1', airline: 'Demo Air', flightNumber: 'DA 101',
  source: 'Chennai', destination: 'Paris', departureDate: '2026-11-10',
  departureTime: '09:00', arrivalTime: '15:00', durationMinutes: 360,
  stops: 0, price: 12000, currency: 'INR'
};

describe('FlightCardComponent', () => {
  it('renders flight details and emits the selected flight', async () => {
    await TestBed.configureTestingModule({ imports: [FlightCardComponent] }).compileComponents();
    const fixture = TestBed.createComponent(FlightCardComponent);
    fixture.componentRef.setInput('flight', flight);
    const selected = vi.fn();
    fixture.componentInstance.select.subscribe(selected);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Demo Air');
    expect(fixture.nativeElement.textContent).toContain('DA 101');
    fixture.nativeElement.querySelector('button').click();
    expect(selected).toHaveBeenCalledWith(flight);
  });
});
