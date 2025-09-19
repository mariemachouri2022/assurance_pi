import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSinistreComponent } from './update-sinistre.component';

describe('UpdateSinistreComponent', () => {
  let component: UpdateSinistreComponent;
  let fixture: ComponentFixture<UpdateSinistreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSinistreComponent]
    });
    fixture = TestBed.createComponent(UpdateSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
