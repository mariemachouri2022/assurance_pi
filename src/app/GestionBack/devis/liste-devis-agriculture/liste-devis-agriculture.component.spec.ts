import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisAgricultureComponent } from './liste-devis-agriculture.component';

describe('ListeDevisAgricultureComponent', () => {
  let component: ListeDevisAgricultureComponent;
  let fixture: ComponentFixture<ListeDevisAgricultureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisAgricultureComponent]
    });
    fixture = TestBed.createComponent(ListeDevisAgricultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
