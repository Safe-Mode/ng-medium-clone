import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserInterface } from '../../../shared/types/user.interface';
import { UserInputInterface } from './../../../shared/types/user-input.interface';
import { updateUserAction, updateUserFailureAction, updateUserSuccessAction } from '../actions/update-user.action';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class UpdateUserEffect {

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUserAction),
    switchMap(({ data }: { data: UserInputInterface }): Observable<Action> => this.authService
      .updateUser(data)
      .pipe(
        map((user: UserInterface): Action => updateUserSuccessAction({ user })),
        catchError(({ error }: HttpErrorResponse): Observable<Action> => of(updateUserFailureAction({ errors: error.errors })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }
}
