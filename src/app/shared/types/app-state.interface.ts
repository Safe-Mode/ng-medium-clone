import { AuthStateInterface } from '../../auth/types/auth-state.interface';
import { FeedStateInterface } from '../modules/feed/types/feed-state.interface';
import { PopularTagsStateInterface } from '../modules/popular-tags/types/popular-tags-state.interface';
import { ArticleStateInterface } from '../../article/types/article-state.interface';
import { NewArticleStateInterface } from '../../new-article/types/new-article-state.interface';
import { EditArticleStateInterface } from '../../edit-article/types/edit-article-state.interface';
import { SettingsStateInterface } from './../../settings/types/settings-state.interface';
import { ProfileStateInterface } from 'src/app/profile/types/profile-state.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  popularTags: PopularTagsStateInterface;
  article: ArticleStateInterface;
  newArticle: NewArticleStateInterface;
  editArticle: EditArticleStateInterface;
  settings: SettingsStateInterface;
  profile: ProfileStateInterface;
}
