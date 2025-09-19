import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddevisAutoComponent } from './adddevis-auto.component';

describe('AdddevisAutoComponent', () => {
  let component: AdddevisAutoComponent;
  let fixture: ComponentFixture<AdddevisAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdddevisAutoComponent]
    });
    fixture = TestBed.createComponent(AdddevisAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
