import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PersistenceService } from '../shared/services/persistance.service';
import { AuthService } from './services/auth.service';
import { BackendErrorsModule } from '../shared/modules/backend-errors/backend-errors.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { reducers } from './store/reducers';
import { RegisterEffect } from './store/effects/register.effect';
import { LoginEffect } from './store/effects/login.effect';
import { GetUserEffect } from './store/effects/get-user.effect';

const routes: Routes = [{
  path: 'register',
  component: RegisterComponent
}, {
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetUserEffect
    ])
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    PersistenceService,
    AuthService
  ]
})
export class AuthModule {
}
