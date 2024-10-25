import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaDetalleComponent } from './agencia-detalle.component';

describe('AgenciaDetalleComponent', () => {
  let component: AgenciaDetalleComponent;
  let fixture: ComponentFixture<AgenciaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
