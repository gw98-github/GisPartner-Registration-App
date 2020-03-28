import { TestBed } from '@angular/core/testing';

import { PersonFirebaseService } from './person-firebase.service';

describe('PersonFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonFirebaseService = TestBed.get(PersonFirebaseService);
    expect(service).toBeTruthy();
  });
});
