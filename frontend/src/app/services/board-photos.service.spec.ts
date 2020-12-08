import { TestBed } from '@angular/core/testing';

import { BoardPhotosService } from './board-photos.service';

describe('BoardPhotosService', () => {
  let service: BoardPhotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardPhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
