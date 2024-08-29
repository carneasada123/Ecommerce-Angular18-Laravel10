import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeterwereComponent } from './beterwere.component';

describe('BeterwereComponent', () => {
  let component: BeterwereComponent;
  let fixture: ComponentFixture<BeterwereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeterwereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeterwereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
