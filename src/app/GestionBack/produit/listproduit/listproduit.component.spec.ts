import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitComponent } from './listproduit.component';

describe('ListproduitComponent', () => {
  let component: ListProduitComponent;
  let fixture: ComponentFixture<ListProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProduitComponent]
    });
    fixture = TestBed.createComponent(ListProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
