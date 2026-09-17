import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MyEvents } from './my-events';

describe('MyEvents', () => {
  let component: MyEvents;
  let fixture: ComponentFixture<MyEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyEvents],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MyEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
