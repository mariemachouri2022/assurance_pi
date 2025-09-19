import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VieFormComponent } from './vie-form.component';

describe('VieFormComponent', () => {
  let component: VieFormComponent;
  let fixture: ComponentFixture<VieFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VieFormComponent]
    });
    fixture = TestBed.createComponent(VieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
