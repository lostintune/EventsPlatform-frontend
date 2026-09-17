import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventForm } from './event-form';
import { provideRouter } from '@angular/router';


describe('EventForm', () => {
  let component: EventForm;
  let fixture: ComponentFixture<EventForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
