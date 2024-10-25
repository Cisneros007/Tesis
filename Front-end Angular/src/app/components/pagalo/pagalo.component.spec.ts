import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagaloComponent } from './pagalo.component';

describe('PagaloComponent', () => {
  let component: PagaloComponent;
  let fixture: ComponentFixture<PagaloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagaloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagaloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
