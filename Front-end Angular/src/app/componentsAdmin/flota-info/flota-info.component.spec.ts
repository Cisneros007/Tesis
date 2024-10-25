import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlotaInfoComponent } from './flota-info.component';

describe('FlotaInfoComponent', () => {
  let component: FlotaInfoComponent;
  let fixture: ComponentFixture<FlotaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlotaInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlotaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
