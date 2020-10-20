import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FeedService } from './services/feed.service';
import { FeedComponent } from './components/feed/feed.component';
import { reducers } from './store/reducers';
import { GetFeedEffect } from './store/effects/get-feed.effect';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('feed', reducers),
    EffectsModule.forFeature([GetFeedEffect]),
    RouterModule
  ],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {
}
