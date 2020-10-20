import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FeedService } from './services/feed.service';
import { FeedComponent } from './components/feed/feed.component';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { reducers } from './store/reducers';
import { GetFeedEffect } from './store/effects/get-feed.effect';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    ErrorMessageModule,
    LoadingModule,
    RouterModule,
    StoreModule.forFeature('feed', reducers),
    EffectsModule.forFeature([GetFeedEffect]),
  ],
  exports: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {
}
