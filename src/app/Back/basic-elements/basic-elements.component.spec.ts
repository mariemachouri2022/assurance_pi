import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicElementsComponent } from './basic-elements.component';

describe('BasicElementsComponent', () => {
  let component: BasicElementsComponent;
  let fixture: ComponentFixture<BasicElementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicElementsComponent]
    });
    fixture = TestBed.createComponent(BasicElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
