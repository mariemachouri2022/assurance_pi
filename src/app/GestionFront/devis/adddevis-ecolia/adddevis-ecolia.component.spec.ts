import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddevisEcoliaComponent } from './adddevis-ecolia.component';

describe('AdddevisEcoliaComponent', () => {
  let component: AdddevisEcoliaComponent;
  let fixture: ComponentFixture<AdddevisEcoliaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddevisEcoliaComponent]
    });
    fixture = TestBed.createComponent(AdddevisEcoliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
