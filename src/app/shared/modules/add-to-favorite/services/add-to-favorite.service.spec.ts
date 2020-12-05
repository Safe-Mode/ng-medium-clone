import { TestBed } from '@angular/core/testing';

import { AddToFavoriteService } from './add-to-favorite.service';

describe('AddToFavorite.Service.TsService', () => {
  let service: AddToFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
