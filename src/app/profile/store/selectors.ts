import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { ProfileStateInterface } from '../types/profile-state.interface';
import { ProfileInterface } from 'src/app/shared/types/profile-interface';

export const profileFeatureSelector = createFeatureSelector<AppStateInterface, ProfileStateInterface>('profile');

export const profileSelector = createSelector(
  profileFeatureSelector,
  (profileState: ProfileStateInterface): ProfileInterface | null => profileState.data
);

export const isLoadingSelector = createSelector(
  profileFeatureSelector,
  (profileState: ProfileStateInterface): boolean => profileState.isLoading
);

export const errorSelector = createSelector(
  profileFeatureSelector,
  (profileState: ProfileStateInterface): string | null => profileState.error
);
