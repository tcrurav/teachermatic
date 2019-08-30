import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourNamePage } from './your-name.page';

describe('YourNamePage', () => {
  let component: YourNamePage;
  let fixture: ComponentFixture<YourNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourNamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
