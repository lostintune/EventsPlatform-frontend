import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EventDetail } from './event-detail';

describe('EventDetail', () => {
  let component: EventDetail;
  let fixture: ComponentFixture<EventDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetail],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
