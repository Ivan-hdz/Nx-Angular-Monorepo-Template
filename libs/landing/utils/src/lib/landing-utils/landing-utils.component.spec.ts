import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingUtilsComponent } from './landing-utils.component';

describe('LandingUtilsComponent', () => {
  let component: LandingUtilsComponent;
  let fixture: ComponentFixture<LandingUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingUtilsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
