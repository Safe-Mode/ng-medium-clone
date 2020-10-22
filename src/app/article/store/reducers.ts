import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { ArticleStateInterface } from '../types/article-state.interface';
import { getArticleAction, getArticleFailure, getArticleSuccessAction } from './actions/get-article.action';

const initialState: ArticleStateInterface = {
  isLoading: false,
  data: null,
  error: null
};

const articleReducer = createReducer(
  initialState,
  on(
    getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.article
    })
  ),
  on(
    getArticleFailure,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(
    routerNavigationAction,
    (): ArticleStateInterface => initialState
  )
);

export function reducers(state: ArticleStateInterface, action: Action): ArticleStateInterface {
  return articleReducer(state, action);
}
