import { TestBed } from '@angular/core/testing';

import { MockTodoService } from './mock-todo-service.service';

describe('MockTodoServiceService', () => {
  let service: MockTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
