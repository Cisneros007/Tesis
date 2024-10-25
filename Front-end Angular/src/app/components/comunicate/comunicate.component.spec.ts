import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicateComponent } from './comunicate.component';

describe('ComunicateComponent', () => {
  let component: ComunicateComponent;
  let fixture: ComponentFixture<ComunicateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComunicateComponent]
    });
    fixture = TestBed.createComponent(ComunicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
