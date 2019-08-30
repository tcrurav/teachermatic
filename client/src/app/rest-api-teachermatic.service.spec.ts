import { TestBed } from '@angular/core/testing';

import { RestApiTeachermaticService } from './rest-api-teachermatic.service';

describe('RestApiTeachermaticService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestApiTeachermaticService = TestBed.get(RestApiTeachermaticService);
    expect(service).toBeTruthy();
  });
});
