import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutasHorariosComponent } from './rutas-horarios.component';

describe('RutasHorariosComponent', () => {
  let component: RutasHorariosComponent;
  let fixture: ComponentFixture<RutasHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RutasHorariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutasHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
