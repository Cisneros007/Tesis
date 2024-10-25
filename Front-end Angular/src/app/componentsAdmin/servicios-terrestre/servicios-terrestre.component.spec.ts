import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosTerrestreComponent } from './servicios-terrestre.component';

describe('ServiciosTerrestreComponent', () => {
  let component: ServiciosTerrestreComponent;
  let fixture: ComponentFixture<ServiciosTerrestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosTerrestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosTerrestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
