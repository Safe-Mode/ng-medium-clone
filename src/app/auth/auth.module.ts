import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register.component';
import { BackendErrorsModule } from '../shared/modules/backend-errors/backend-errors.module';
import { reducers } from './store/reducers';
import { RegisterEffect } from './store/effects/register.effect';

const routes: Routes = [{
  path: 'register',
  component: RegisterComponent
}];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect])
  ],
  declarations: [RegisterComponent],
  providers: [AuthService]
})
export class AuthModule {
}
