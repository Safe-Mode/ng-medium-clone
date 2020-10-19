import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PersistenceService } from './persistance.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private persistenceService: PersistenceService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.persistenceService.get('accessToken');

    req = req.clone({
      setHeaders: {
        Authorization: (token) ? `Token ${token}` : ''
      }
    });

    return next.handle(req);
  }

}
