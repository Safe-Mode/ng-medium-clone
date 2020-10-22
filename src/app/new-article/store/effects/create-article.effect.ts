import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ArticleInterface } from '../../../shared/types/article.interface';
import { NewArticleService } from '../../services/new-article.service';
import { createArticleAction, createArticleFailureAction, createArticleSuccessAction } from '../actions/create-article.action';

@Injectable()
export class CreateArticleEffect {

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleAction),
    switchMap(({ input }) => this.articleService
      .createArticle(input)
      .pipe(
        map((article: ArticleInterface) => createArticleSuccessAction({ article })),
        catchError(({ error }: HttpErrorResponse) => of(
          createArticleFailureAction({ errors: error.errors }))
        )
      )
    )
  ));

  redirectAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(createArticleSuccessAction),
    tap(({ article: { slug } }) => this.router.navigate(['/articles', slug]))
  ));

  constructor(
    private router: Router,
    private actions$: Actions,
    private articleService: NewArticleService
  ) {
  }

}
