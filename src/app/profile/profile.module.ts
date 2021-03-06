import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProfileComponent } from './components/profile/profile.component';
import { ProfileService } from './services/profile.service';
import { GetProfileEffect } from './store/effects/get-profile.effect';
import { reducers } from './store/reducers';
import { FeedModule } from '../shared/modules/feed/feed.module';

const routes: Routes = [{
  path: 'profiles/:slug',
  component: ProfileComponent
}, {
  path: 'profiles/:slug/favorite',
  component: ProfileComponent
}];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FeedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature([GetProfileEffect])
  ],
  providers: [ProfileService]
})
export class ProfileModule {
}
