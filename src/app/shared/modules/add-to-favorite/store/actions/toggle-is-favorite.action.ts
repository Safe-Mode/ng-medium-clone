import { createAction, props } from '@ngrx/store';

import { ArticleResponseInterface } from 'src/app/shared/types/article-response.interface';
import { ActionTypes } from '../action-types';

export const toggleIsFavoriteAction = createAction(
  ActionTypes.TOGGLE_IS_FAVORITE,
  props<{ articleSlug: string, authToken: string }>()
);

export const toggleIsFavoriteSuccessAction = createAction(
  ActionTypes.TOGGLE_IS_FAVORITE_SUCCESS,
  props<{ article: ArticleResponseInterface }>()
);

export const toggleIsFavoriteFailureAction = createAction(ActionTypes.TOGGLE_IS_FAVORITE_FAILURE);
