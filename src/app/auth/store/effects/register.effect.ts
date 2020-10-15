import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { UserInterface } from '../../../shared/types/user.interface';
import { AuthService } from '../../services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action';

@Injectable()
export class RegisterEffect {
  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ request }) => this.authService
      .register(request)
      .pipe(
        map((user: UserInterface) => registerSuccessAction({ user })),
        catchError((errorResponse: HttpErrorResponse) => of(registerFailureAction({ errors: errorResponse.error.errors })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }
}
