import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisHabitationComponent } from './liste-devis-habitation.component';

describe('ListeDevisHabitationComponent', () => {
  let component: ListeDevisHabitationComponent;
  let fixture: ComponentFixture<ListeDevisHabitationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisHabitationComponent]
    });
    fixture = TestBed.createComponent(ListeDevisHabitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
