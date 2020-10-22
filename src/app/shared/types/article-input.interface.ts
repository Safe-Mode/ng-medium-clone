import { TagType } from './tag.type';

export interface ArticleInputInterface {
  title: string;
  description: string;
  body: string;
  tagList: TagType[];
}
