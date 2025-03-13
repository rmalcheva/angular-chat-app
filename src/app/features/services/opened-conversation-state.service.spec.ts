import { TestBed } from '@angular/core/testing';

import { OpenedConversationStateService } from './opened-conversation-state.service';

describe('OpenedConversationStateService', () => {
  let service: OpenedConversationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenedConversationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
