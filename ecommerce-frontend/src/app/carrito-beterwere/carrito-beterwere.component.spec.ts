import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoBeterwereComponent } from './carrito-beterwere.component';

describe('CarritoBeterwereComponent', () => {
  let component: CarritoBeterwereComponent;
  let fixture: ComponentFixture<CarritoBeterwereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoBeterwereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoBeterwereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
