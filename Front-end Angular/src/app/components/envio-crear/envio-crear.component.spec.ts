import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioCrearComponent } from './envio-crear.component';

describe('EnvioCrearComponent', () => {
  let component: EnvioCrearComponent;
  let fixture: ComponentFixture<EnvioCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvioCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
