import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciasAdminComponent } from './agencias-admin.component';

describe('AgenciasAdminComponent', () => {
  let component: AgenciasAdminComponent;
  let fixture: ComponentFixture<AgenciasAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciasAdminComponent]
    });
    fixture = TestBed.createComponent(AgenciasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
