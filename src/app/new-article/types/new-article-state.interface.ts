import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface NewArticleStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
