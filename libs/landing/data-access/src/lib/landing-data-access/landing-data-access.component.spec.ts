import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingDataAccessComponent } from './landing-data-access.component';

describe('LandingDataAccessComponent', () => {
  let component: LandingDataAccessComponent;
  let fixture: ComponentFixture<LandingDataAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingDataAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingDataAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
