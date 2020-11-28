import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from './../../../shared/types/app-state.interface';
import { UserInterface } from './../../../shared/types/user.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { userSelector, isSubmittingSelector, validationErrorsSelector } from './../../../auth/store/selectors';
import { logoutAction } from 'src/app/auth/store/actions/sync.actions';
import { updateUserAction } from './../../../auth/store/actions/update-user.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form!: FormGroup;
  userSubscription!: Subscription;
  user: UserInterface | null = null;

  isSubmitting$!: Observable<boolean>;
  backendErrors$!: Observable<BackendErrorsInterface | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  initializeListeners(): void {
    this.userSubscription = this.store
      .pipe(
        select(userSelector),
        filter((user: UserInterface | null): boolean => Boolean(user))
      )
      .subscribe((user: UserInterface | null) => {
        this.user = user;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.user?.image,
      username: this.user?.username,
      bio: this.user?.bio,
      email: this.user?.email,
      password: ''
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(updateUserAction({ data: { ...this.user, ...this.form.value } }));
    }
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

}
