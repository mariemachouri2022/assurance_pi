import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterUserComponent]
    });
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
