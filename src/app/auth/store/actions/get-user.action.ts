import { createAction, props } from '@ngrx/store';

import { UserInterface } from '../../../shared/types/user.interface';
import { ActionTypes } from '../action-types';

export const getUserAction = createAction(ActionTypes.GET_USER);

export const getUserSuccessAction = createAction(
  ActionTypes.GET_USER_SUCCESS,
  props<{ user: UserInterface }>()
);

export const getUserFailureAction = createAction(ActionTypes.GET_USER_FAILURE);
