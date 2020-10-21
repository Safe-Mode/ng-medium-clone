import { Action, createReducer, on } from '@ngrx/store';

import { PopularTagsStateInterface } from '../types/popular-tags-state.interface';
import { getTagsAction, getTagsFailureAction, getTagsSuccessAction } from './actions/get-tags.action';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  data: null,
  error: null
};

const tagsReducer = createReducer(
  initialState,
  on(
    getTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.tags
    })
  ),
  on(
    getTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducers(state: PopularTagsStateInterface, action: Action): PopularTagsStateInterface {
  return tagsReducer(state, action);
}
