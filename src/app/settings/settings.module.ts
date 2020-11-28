import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { BackendErrorsModule } from '../shared/modules/backend-errors/backend-errors.module';
import { reducers } from './store/reducers';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [{
  path: 'settings',
  component: SettingsComponent
}];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', reducers)
  ],
  exports: [SettingsComponent]
})
export class SettingsModule {
}
