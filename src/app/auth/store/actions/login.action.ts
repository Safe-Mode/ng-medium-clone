import { createAction, props } from '@ngrx/store';

import { UserInterface } from '../../../shared/types/user.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { LoginRequestInterface } from '../../types/login-request.interface';
import { ActionTypes } from '../action-types';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ user: UserInterface }>()
);

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
