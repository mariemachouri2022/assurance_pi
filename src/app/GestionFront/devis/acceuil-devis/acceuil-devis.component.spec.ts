import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilDevisComponent } from './acceuil-devis.component';

describe('AcceuilDevisComponent', () => {
  let component: AcceuilDevisComponent;
  let fixture: ComponentFixture<AcceuilDevisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceuilDevisComponent]
    });
    fixture = TestBed.createComponent(AcceuilDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
