import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisVoyageComponent } from './liste-devis-voyage.component';

describe('ListeDevisVoyageComponent', () => {
  let component: ListeDevisVoyageComponent;
  let fixture: ComponentFixture<ListeDevisVoyageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisVoyageComponent]
    });
    fixture = TestBed.createComponent(ListeDevisVoyageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
