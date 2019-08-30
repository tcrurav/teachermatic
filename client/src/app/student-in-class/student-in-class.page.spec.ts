import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInClassPage } from './student-in-class.page';

describe('StudentInClassPage', () => {
  let component: StudentInClassPage;
  let fixture: ComponentFixture<StudentInClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentInClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentInClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
