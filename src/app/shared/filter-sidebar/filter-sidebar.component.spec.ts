/**
 * Unit tests for filter-sidebar, covering expected component/service behavior.
 */
import { TestBed } from '@angular/core/testing';
import { FilterSidebarComponent } from './filter-sidebar.component';

describe('FilterSidebarComponent', () => {
  it('emits the airline selection when a checkbox is changed', async () => {
    await TestBed.configureTestingModule({ imports: [FilterSidebarComponent] }).compileComponents();
    const fixture = TestBed.createComponent(FilterSidebarComponent);
    fixture.componentRef.setInput('airlines', ['Air India', 'IndiGo']);
    fixture.componentRef.setInput('selectedAirlines', []);
    fixture.componentRef.setInput('selectedSlots', []);
    const changed = vi.fn();
    fixture.componentInstance.airlinesChange.subscribe(changed);
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('input[type=checkbox]');
    checkbox.click();
    expect(changed).toHaveBeenCalled();
    expect(fixture.nativeElement.textContent).not.toContain('Non-stop only');
    const sortOptions = fixture.nativeElement.querySelectorAll('#sortBy option');
    expect(sortOptions.length).toBe(4);
    expect([...sortOptions].map((option: HTMLOptionElement) => option.value)).toEqual(['price-asc', 'price-desc', 'duration-asc', 'duration-desc']);
  });
});
