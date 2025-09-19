import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSinistreComponent } from './liste-sinistre.component';

describe('ListeSinistreComponent', () => {
  let component: ListeSinistreComponent;
  let fixture: ComponentFixture<ListeSinistreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeSinistreComponent]
    });
    fixture = TestBed.createComponent(ListeSinistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
