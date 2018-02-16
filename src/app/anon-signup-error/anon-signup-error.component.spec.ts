import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonSignupErrorComponent } from './anon-signup-error.component';

describe('AnonSignupErrorComponent', () => {
  let component: AnonSignupErrorComponent;
  let fixture: ComponentFixture<AnonSignupErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonSignupErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonSignupErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
