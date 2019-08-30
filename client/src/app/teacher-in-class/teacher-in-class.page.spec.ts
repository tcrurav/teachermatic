import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInClassPage } from './teacher-in-class.page';

describe('TeacherInClassPage', () => {
  let component: TeacherInClassPage;
  let fixture: ComponentFixture<TeacherInClassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherInClassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
