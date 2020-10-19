import { Action, createReducer, on } from '@ngrx/store';

import { AuthStateInterface } from '../types/auth-state.interface';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions/register.action';
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.action';
import { getUserAction, getUserFailureAction, getUserSuccessAction } from './actions/get-user.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  user: null,
  isLoggedIn: null,
  validationErrors: null
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      user: action.user
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      user: action.user,
      isLoggedIn: true
    })
  ),
  on(
    loginFailureAction,
    ((state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    }))
  ),
  on(
    getUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      user: action.user
    })
  ),
  on(
    getUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      user: null
    })
  )
);

export function reducers(state: AuthStateInterface, action: Action): AuthStateInterface {
  return authReducer(state, action);
}
