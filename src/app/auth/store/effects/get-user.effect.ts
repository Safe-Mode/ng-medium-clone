import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PersistenceService } from '../../../shared/services/persistance.service';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../../shared/types/user.interface';
import { getUserAction, getUserFailureAction, getUserSuccessAction } from '../actions/get-user.action';

@Injectable()
export class GetUserEffect {

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(getUserAction),
    switchMap(() => (this.persistenceService.get('accessToken')) ?
      this.authService
        .getUser()
        .pipe(
          map((user: UserInterface) => getUserSuccessAction({ user })),
          catchError(() => of(getUserFailureAction()))
        ) :
      of(getUserFailureAction())
    )
  ));

  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private authService: AuthService
  ) {
  }
}
