import { TestBed } from '@angular/core/testing';

import { CandidateSkillsService } from './candidate-skills.service';

describe('CandidateSkillsService', () => {
  let service: CandidateSkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateSkillsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
