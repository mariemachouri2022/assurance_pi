import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisAutoComponent } from './liste-devis-auto.component';

describe('ListeDevisAutoComponent', () => {
  let component: ListeDevisAutoComponent;
  let fixture: ComponentFixture<ListeDevisAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisAutoComponent]
    });
    fixture = TestBed.createComponent(ListeDevisAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
