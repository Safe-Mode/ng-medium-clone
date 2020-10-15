import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { UserInterface } from '../../shared/types/user.interface';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    return this.http
      .post<AuthResponseInterface>(`${environment.apiUrl}/users`, data)
      .pipe(map((response: AuthResponseInterface) => response.user));
  }

}
