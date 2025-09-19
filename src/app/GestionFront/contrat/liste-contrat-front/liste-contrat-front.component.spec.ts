import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeContratFrontComponent } from './liste-contrat-front.component';

describe('ListeContratFrontComponent', () => {
  let component: ListeContratFrontComponent;
  let fixture: ComponentFixture<ListeContratFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeContratFrontComponent]
    });
    fixture = TestBed.createComponent(ListeContratFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
