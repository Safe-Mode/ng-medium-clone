import { getArticleFailureAction } from './../../../edit-article/store/actions/get-article.action';
import { getProfileAction, getProfileSuccessAction } from './../actions/get-profile.action';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ProfileInterface } from 'src/app/shared/types/profile-interface';
import { ProfileService } from '../../services/profile.service';

@Injectable()
export class GetProfileEffect {

  getProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getProfileAction),
    switchMap(({ slug }) => this.profileService
      .getProfile(slug)
      .pipe(
        map((profile: ProfileInterface) => getProfileSuccessAction({ profile })),
        catchError(() => of(getArticleFailureAction()))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {
  }

}
