import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { EditArticleService } from '../../services/edit-article.service';
import { updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction } from '../actions/update-article.action';

@Injectable()
export class UpdateArticleEffect {

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),
    switchMap(({ slug, input }) => this.articleService
      .updateArticle(slug, input)
      .pipe(
        map((article: ArticleInterface) => updateArticleSuccessAction({ article })),
        catchError(({ error }: HttpErrorResponse) => of(
          updateArticleFailureAction({ errors: error.errors }))
        )
      )
    )
  ));

  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleSuccessAction),
    tap(({ article: { slug } }) => this.router.navigate(['/articles', slug]))
  ), { dispatch: false });

  constructor(
    private router: Router,
    private actions$: Actions,
    private articleService: EditArticleService
  ) {
  }

}
