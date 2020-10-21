import { createAction, props } from '@ngrx/store';

import { TagType } from '../../../../types/tag.type';
import { ActionTypes } from '../action-types';

export const getTagsAction = createAction(ActionTypes.GET_TAGS);

export const getTagsSuccessAction = createAction(
  ActionTypes.GET_TAGS_SUCCESS,
  props<{ tags: TagType[] }>()
);

export const getTagsFailureAction = createAction(ActionTypes.GET_TAGS_FAILURE);
