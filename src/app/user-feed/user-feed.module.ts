import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { PopularTagsModule } from '../shared/modules/popular-tags/popular-tags.module';
import { FeedToggleModule } from '../shared/modules/feed-toggle/feed-toggle.module';

const routes: Routes = [{
  path: 'feed',
  component: UserFeedComponent
}];

@NgModule({
  declarations: [UserFeedComponent],
  imports: [
    CommonModule,
    BannerModule,
    FeedModule,
    PopularTagsModule,
    FeedToggleModule,
    RouterModule.forRoot(routes)
  ]
})
export class UserFeedModule {
}
