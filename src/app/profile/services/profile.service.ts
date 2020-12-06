import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ProfileInterface } from 'src/app/shared/types/profile-interface';
import { GetProfileResponseInterface } from '../types/get-profile-response.interface';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getProfile(slug: string): Observable<ProfileInterface> {
    return this.http
      .get<GetProfileResponseInterface>(`${environment.apiUrl}/profiles/${slug}`)
      .pipe(
        map((response: GetProfileResponseInterface) => response.profile)
      );
  }

}
