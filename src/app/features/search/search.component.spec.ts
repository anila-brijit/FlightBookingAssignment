/**
 * Unit tests for search, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SearchComponent } from './search.component';
import { BookingService } from '../../core/services/booking.service';

describe('SearchComponent', () => {
  let bookingService: BookingService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [provideRouter([]), BookingService]
    });
    bookingService = TestBed.inject(BookingService);
    router = TestBed.inject(Router);
  });

  it('does not show passenger count on the search page', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#passengers')).toBeNull();
  });

  it('saves search criteria and navigates when the form is valid', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();

    fixture.componentInstance.searchForm.setValue({
      source: 'Chennai',
      destination: 'Paris',
      departureDate: '2026-11-10',
      roundTrip: false,
      returnDate: ''
    });

    fixture.componentInstance.submitSearch();

    expect(bookingService.getSearchCriteria()).toEqual({
      source: 'Chennai',
      destination: 'Paris',
      departureDate: '2026-11-10',
      roundTrip: false,
      returnDate: ''
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/results']);
  });

  it('does not navigate when origin and destination are identical', () => {
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();

    fixture.componentInstance.searchForm.controls.destination.setValue('Chennai');
    fixture.componentInstance.submitSearch();

    expect(fixture.componentInstance.searchForm.controls.destination.errors?.['sameCity']).toBe(true);
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
