import { ArticleInterface } from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface EditArticleStateInterface {
  article: ArticleInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
