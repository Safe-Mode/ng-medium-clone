import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { registerAction } from '../store/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.getForm();

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit(): void {

  }

  getForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onFormSubmit(): void {
    console.log(this.form.value, this.form.valid);
    this.store.dispatch(registerAction(this.form.value));
  }
}
