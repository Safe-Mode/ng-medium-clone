import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { ArticleService as SharedArticleService } from '../../../shared/services/article.service';
import { getArticleAction, getArticleFailure, getArticleSuccessAction } from '../actions/get-article.action';

@Injectable()
export class GetArticleEffect {

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),
    switchMap(({ slug }) => this.articleService
      .getArticle(slug)
      .pipe(
        map((article: ArticleInterface) => getArticleSuccessAction({ article })),
        catchError(() => of(getArticleFailure()))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private articleService: SharedArticleService
  ) {
  }

}
