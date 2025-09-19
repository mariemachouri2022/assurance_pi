import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDevisVieComponent } from './liste-devis-vie.component';

describe('ListeDevisVieComponent', () => {
  let component: ListeDevisVieComponent;
  let fixture: ComponentFixture<ListeDevisVieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDevisVieComponent]
    });
    fixture = TestBed.createComponent(ListeDevisVieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
