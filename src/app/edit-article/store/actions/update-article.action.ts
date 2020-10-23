import { createAction, props } from '@ngrx/store';

import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { ActionTypes } from '../action-types';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ slug: string, input: ArticleInputInterface }>()
);

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
