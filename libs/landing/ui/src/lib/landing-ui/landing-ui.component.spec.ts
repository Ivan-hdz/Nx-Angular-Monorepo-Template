import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingUiComponent } from './landing-ui.component';

describe('LandingUiComponent', () => {
  let component: LandingUiComponent;
  let fixture: ComponentFixture<LandingUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
