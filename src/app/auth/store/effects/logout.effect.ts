import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { PersistenceService } from './../../../shared/services/persistance.service';
import { logoutAction } from './../actions/sync.actions';

@Injectable()
export class LogoutEffect {

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logoutAction),
    tap(() => {
      this.persistenceService.set('accessToken', '');
      this.router.navigateByUrl('/');
    })
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private persistenceService: PersistenceService,
    private router: Router
  ) {
  }
}
