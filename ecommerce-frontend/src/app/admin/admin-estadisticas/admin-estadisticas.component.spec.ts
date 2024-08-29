import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstadisticasComponent } from './admin-estadisticas.component';

describe('AdminEstadisticasComponent', () => {
  let component: AdminEstadisticasComponent;
  let fixture: ComponentFixture<AdminEstadisticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEstadisticasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
