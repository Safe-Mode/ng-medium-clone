import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FeedResponseInterface } from '../../types/feed-response.interface';
import { FeedService } from '../../services/feed.service';
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from '../actions/get-feed.action';

@Injectable()
export class GetFeedEffect {

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap(({ url }) => this.feedService
      .getFeed(url)
      .pipe(
        map((feed: FeedResponseInterface) => getFeedSuccessAction({ feed })),
        catchError(() => of(getFeedFailureAction()))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  ) {
  }

}
