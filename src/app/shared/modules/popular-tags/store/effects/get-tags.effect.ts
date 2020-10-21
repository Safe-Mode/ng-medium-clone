import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TagType } from '../../../../types/tag.type';
import { PopularTagsService } from '../../services/popular-tags.service';
import { getTagsAction, getTagsFailureAction, getTagsSuccessAction } from '../actions/get-tags.action';

@Injectable()
export class GetTagsEffect {

  getTags$ = createEffect(() => this.actions$.pipe(
    ofType(getTagsAction),
    switchMap(() => this.popularTagsService
      .fetchTags()
      .pipe(
        map((tags: TagType[]) => getTagsSuccessAction({ tags })),
        catchError(() => of(getTagsFailureAction()))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {
  }

}
