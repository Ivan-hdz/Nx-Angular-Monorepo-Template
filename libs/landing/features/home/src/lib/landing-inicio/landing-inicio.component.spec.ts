import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingInicioComponent } from './landing-inicio.component';

describe('LandingInicioComponent', () => {
  let component: LandingInicioComponent;
  let fixture: ComponentFixture<LandingInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingInicioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
