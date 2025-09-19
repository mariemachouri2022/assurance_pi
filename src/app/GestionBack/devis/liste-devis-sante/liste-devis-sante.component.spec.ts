import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisSanteComponent } from './liste-devis-sante.component';

describe('ListeDevisSanteComponent', () => {
  let component: ListeDevisSanteComponent;
  let fixture: ComponentFixture<ListeDevisSanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisSanteComponent]
    });
    fixture = TestBed.createComponent(ListeDevisSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
