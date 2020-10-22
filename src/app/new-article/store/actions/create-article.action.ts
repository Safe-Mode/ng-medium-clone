import { createAction, props } from '@ngrx/store';

import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { ActionTypes } from '../action-types';

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ input: ArticleInputInterface }>()
);

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
