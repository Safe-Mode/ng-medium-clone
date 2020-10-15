import { createAction, props } from '@ngrx/store';

import { RegisterRequestInterface } from '../../types/register-request.interface';
import { UserInterface } from '../../../shared/types/user.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { ActionTypes } from '../action-types';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{ request: RegisterRequestInterface }>()
);

export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{ user: UserInterface }>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
