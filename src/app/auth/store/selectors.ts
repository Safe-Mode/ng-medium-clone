import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from '../../shared/types/app-state.interface';
import { AuthStateInterface } from '../types/auth-state.interface';

export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validationErrors
);

export const loginStatusSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isLoggedIn
);

export const userSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.user
);
