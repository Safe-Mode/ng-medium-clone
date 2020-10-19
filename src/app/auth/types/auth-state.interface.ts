import { UserInterface } from '../../shared/types/user.interface';
import { BackendErrorsInterface } from '../../shared/types/backend-errors.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  isLoading: boolean;
  user: UserInterface | null;
  isLoggedIn: boolean | null;
  validationErrors: BackendErrorsInterface | null;
}
