import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginUserComponent;
  let fixture: ComponentFixture<LoginUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginUserComponent]
    });
    fixture = TestBed.createComponent(LoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
