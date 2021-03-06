import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { createEffect, ofType, Actions } from '@ngrx/effects';

import { UserInterface } from '../../../shared/types/user.interface';
import { PersistenceService } from '../../../shared/services/persistance.service';
import { AuthService } from '../../services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions/register.action';

@Injectable()
export class RegisterEffect {

  register$ = createEffect(() => this.actions$.pipe(
    ofType(registerAction),
    switchMap(({ request }) => this.authService
      .register(request)
      .pipe(
        tap((user: UserInterface) => this.persistenceService.set('accessToken', user.token)),
        map((user: UserInterface) => registerSuccessAction({ user })),
        catchError(({ error }: HttpErrorResponse) => of(registerFailureAction({ errors: error.errors })))
      )
    )
  ));

  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(registerSuccessAction),
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
