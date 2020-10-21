import { TagType } from '../../../types/tag.type';

export interface PopularTagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: TagType[] | null;
}
