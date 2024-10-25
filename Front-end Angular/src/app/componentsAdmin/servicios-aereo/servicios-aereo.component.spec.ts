import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAereoComponent } from './servicios-aereo.component';

describe('ServiciosAereoComponent', () => {
  let component: ServiciosAereoComponent;
  let fixture: ComponentFixture<ServiciosAereoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosAereoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosAereoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
