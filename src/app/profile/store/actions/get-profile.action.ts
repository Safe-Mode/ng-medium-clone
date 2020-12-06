import { createAction, props } from '@ngrx/store';

import { ProfileInterface } from 'src/app/shared/types/profile-interface';
import { ActionTypes } from './../action-types';

export const getProfileAction = createAction(
  ActionTypes.GET_PROFILE,
  props<{ slug: string }>()
);

export const getProfileSuccessAction = createAction(
  ActionTypes.GET_PROFILE_SUCCESS,
  props<{ profile: ProfileInterface }>()
);

export const getProfileFailureAction = createAction(ActionTypes.GET_PROFILE_FAILURE);
