import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioHistorialComponent } from './envio-historial.component';

describe('EnvioHistorialComponent', () => {
  let component: EnvioHistorialComponent;
  let fixture: ComponentFixture<EnvioHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvioHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
