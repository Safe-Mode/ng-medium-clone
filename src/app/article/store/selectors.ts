import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from '../../shared/types/app-state.interface';
import { ArticleStateInterface } from '../types/article-state.interface';

export const ArticleFeatureSelector = createFeatureSelector<AppStateInterface, ArticleStateInterface>('article');

export const isLoadingSelector = createSelector(
  ArticleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.isLoading
);

export const articleSelector = createSelector(
  ArticleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.data
);

export const errorSelector = createSelector(
  ArticleFeatureSelector,
  (articleState: ArticleStateInterface) => articleState.error
);
