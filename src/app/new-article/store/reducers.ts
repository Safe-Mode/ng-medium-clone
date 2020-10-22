import { NewArticleStateInterface } from '../types/new-article-state.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { createArticleAction, createArticleFailureAction, createArticleSuccessAction } from './actions/create-article.action';

const initialState: NewArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const creatArticleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): NewArticleStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    createArticleSuccessAction,
    (state): NewArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    createArticleFailureAction,
    (state, action): NewArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);

export function reducers(state: NewArticleStateInterface, action: Action): NewArticleStateInterface {
  return creatArticleReducer(state, action);
}
