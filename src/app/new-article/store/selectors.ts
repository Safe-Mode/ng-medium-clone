import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/app-state.interface';
import { NewArticleStateInterface } from '../types/new-article-state.interface';

export const newArticleFeatureSelector = createFeatureSelector<AppStateInterface, NewArticleStateInterface>('newArticle');

export const isSubmittingSelector = createSelector(
  newArticleFeatureSelector,
  (newArticleState: NewArticleStateInterface) => newArticleState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  newArticleFeatureSelector,
  (newArticleState: NewArticleStateInterface) => newArticleState.validationErrors
);
