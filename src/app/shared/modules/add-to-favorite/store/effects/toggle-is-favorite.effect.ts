import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ArticleResponseInterface } from 'src/app/shared/types/article-response.interface';
import { AddToFavoriteService } from '../../services/add-to-favorite.service';
import { toggleIsFavoriteAction, toggleIsFavoriteSuccessAction, toggleIsFavoriteFailureAction } from '../actions/toggle-is-favorite.action';

@Injectable()
export class ToggleIsFavoriteEffect {

  toggleIsFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(toggleIsFavoriteAction),
    switchMap(({ articleSlug, authToken }): Observable<Action> => {
      return this.addTofavoriteService.addToFavorite(articleSlug, authToken).pipe(
        map((article: ArticleResponseInterface) => toggleIsFavoriteSuccessAction({ article })),
        catchError(() => of(toggleIsFavoriteFailureAction()))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private addTofavoriteService: AddToFavoriteService
  ) {
  }

}
