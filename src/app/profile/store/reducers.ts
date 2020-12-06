import { createReducer, on, Action } from '@ngrx/store';

import { ProfileStateInterface } from './../types/profile-state.interface';
import { getProfileAction, getProfileFailureAction, getProfileSuccessAction } from './actions/get-profile.action';

const initialState: ProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const profileReducer = createReducer(
  initialState,
  on(
    getProfileAction,
    (state): ProfileStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getProfileSuccessAction,
    (state, action): ProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: action.profile
    })
  ),
  on(
    getProfileFailureAction,
    (state): ProfileStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducers(state: ProfileStateInterface, action: Action): ProfileStateInterface {
  return profileReducer(state, action);
}
