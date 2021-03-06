import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../shared/types/app-state.interface';
import { RegisterRequestInterface } from '../../types/register-request.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { registerAction } from '../../store/actions/register.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  isSubmitting$: Observable<boolean> = this.getSubmittingStatus();
  backendErrors$: Observable<BackendErrorsInterface | null> = this.getBackendErrors();

  form: FormGroup = this.getForm();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
  }

  getForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  getSubmittingStatus(): Observable<boolean> {
    return this.store.pipe(select(isSubmittingSelector));
  }

  getBackendErrors(): Observable<BackendErrorsInterface | null> {
    return this.store.pipe(select(validationErrorsSelector));
  }

  onFormSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    };

    this.store.dispatch(registerAction({ request }));
  }

}
