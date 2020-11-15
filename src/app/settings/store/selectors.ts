import { BackendErrorsInterface } from './../../shared/types/backend-errors.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from './../../shared/types/app-state.interface';
import { SettingsStateInterface } from './../types/settings-state.interface';

export const settingsFeatureSelector = createFeatureSelector<AppStateInterface, SettingsStateInterface>('settings');

export const isSubmittingSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface): boolean => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingsFeatureSelector,
  (settingsState: SettingsStateInterface): BackendErrorsInterface | null => settingsState.validationErrors
);
