import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegComponent } from './form-reg.component';

describe('FormRegComponent', () => {
  let component: FormRegComponent;
  let fixture: ComponentFixture<FormRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRegComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
