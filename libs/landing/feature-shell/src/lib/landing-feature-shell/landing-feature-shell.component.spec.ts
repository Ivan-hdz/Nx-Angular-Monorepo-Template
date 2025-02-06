import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingFeatureShellComponent } from './landing-feature-shell.component';

describe('LandingFeatureShellComponent', () => {
  let component: LandingFeatureShellComponent;
  let fixture: ComponentFixture<LandingFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
