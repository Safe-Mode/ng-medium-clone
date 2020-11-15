import { createAction, props } from '@ngrx/store';

import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { UserInputInterface } from 'src/app/shared/types/user-input.interface';
import { UserInterface } from 'src/app/shared/types/user.interface';
import { ActionTypes } from '../action-types';

export const updateUserAction = createAction(
  ActionTypes.UPDATE_USER,
  props<{ data: UserInputInterface }>()
);

export const updateUserSuccessAction = createAction(
  ActionTypes.UPDATE_USER_SUCCESS,
  props<{ user: UserInterface }>()
);

export const updateUserFailureAction = createAction(
  ActionTypes.UPDATE_USER_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
