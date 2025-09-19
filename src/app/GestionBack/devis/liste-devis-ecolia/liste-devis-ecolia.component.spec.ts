import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisEcoliaComponent } from './liste-devis-ecolia.component';

describe('ListeDevisEcoliaComponent', () => {
  let component: ListeDevisEcoliaComponent;
  let fixture: ComponentFixture<ListeDevisEcoliaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisEcoliaComponent]
    });
    fixture = TestBed.createComponent(ListeDevisEcoliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
