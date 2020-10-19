import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { RegisterRequestInterface } from '../types/register-request.interface';
import { UserInterface } from '../../shared/types/user.interface';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { LoginRequestInterface } from '../types/login-request.interface';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<UserInterface> {
    return this.authUser(`${environment.apiUrl}/users`, data);
  }

  login(data: LoginRequestInterface): Observable<UserInterface> {
    return this.authUser(`${environment.apiUrl}/users/login`, data);
  }

  getUser(): Observable<UserInterface> {
    return this.http
      .get<AuthResponseInterface>(`${environment.apiUrl}/user`)
      .pipe(map(({ user }) => user));
  }

  private authUser(url: string, data: RegisterRequestInterface | LoginRequestInterface): Observable<UserInterface> {
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(({ user }) => user));
  }

}
