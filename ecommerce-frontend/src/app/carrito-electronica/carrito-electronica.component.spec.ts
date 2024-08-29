import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoElectronicaComponent } from './carrito-electronica.component';

describe('CarritoElectronicaComponent', () => {
  let component: CarritoElectronicaComponent;
  let fixture: ComponentFixture<CarritoElectronicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoElectronicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoElectronicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
