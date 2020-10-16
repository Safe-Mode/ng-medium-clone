import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserInterface } from '../../../shared/types/user.interface';
import { PersistenceService } from '../../../shared/services/persistance.service';
import { AuthService } from '../../services/auth.service';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action';

@Injectable()
export class LoginEffect {

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({ request }) => this.authService
      .login(request)
      .pipe(
        tap((user: UserInterface) => this.persistenceService.set('accessToken', user.token)),
        map((user: UserInterface) => loginSuccessAction({ user })),
        catchError(({ error }: HttpErrorResponse) => of(loginFailureAction({ errors: error.errors })))
      )
    )
  ));

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => this.router.navigateByUrl('/'))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {
  }
}
