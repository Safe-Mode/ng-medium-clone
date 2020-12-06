import { ProfileInterface } from 'src/app/shared/types/profile-interface';

export interface ProfileStateInterface {
  data: ProfileInterface | null;
  isLoading: boolean;
  error: string | null;
}
