import { ArticleInterface } from '../../../types/article.interface';

export interface FeedResponseInterface {
  articles: ArticleInterface[];
  articlesCount: number;
}
