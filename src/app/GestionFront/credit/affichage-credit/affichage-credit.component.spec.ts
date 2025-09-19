import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageCreditComponent } from './affichage-credit.component';

describe('AffichageCreditComponent', () => {
  let component: AffichageCreditComponent;
  let fixture: ComponentFixture<AffichageCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffichageCreditComponent]
    });
    fixture = TestBed.createComponent(AffichageCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
