import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ArticleService } from '../../services/article.service';
import { deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccessAction } from '../actions/delete-article.action';

@Injectable()
export class DeleteArticleEffect {

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap(({ slug }) => this.articleService
      .deleteArticle(slug)
      .pipe(
        map(() => deleteArticleSuccessAction()),
        catchError(() => of(deleteArticleFailureAction()))
      )
    )
  ));

  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleSuccessAction),
    tap(() => this.router.navigate(['/']))
  ), { dispatch: false });

  constructor(
    private router: Router,
    private actions$: Actions,
    private articleService: ArticleService
  ) {
  }

}
