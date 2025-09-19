import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationFormComponent } from './habitation-form.component';

describe('HabitationFormComponent', () => {
  let component: HabitationFormComponent;
  let fixture: ComponentFixture<HabitationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabitationFormComponent]
    });
    fixture = TestBed.createComponent(HabitationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
