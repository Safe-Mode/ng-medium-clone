import { createReducer, on, Action } from '@ngrx/store';

import { SettingsStateInterface } from './../types/settings-state.interface';
import { updateUserAction, updateUserFailureAction, updateUserSuccessAction } from './../../auth/store/actions/update-user.action';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const settingsReducer = createReducer(
  initialState,
  on(
    updateUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateUserFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )
);

export function reducers(state: SettingsStateInterface, action: Action): SettingsStateInterface {
  return settingsReducer(state, action);
}
