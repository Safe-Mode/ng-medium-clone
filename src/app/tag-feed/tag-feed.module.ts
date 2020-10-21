import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { PopularTagsModule } from '../shared/modules/popular-tags/popular-tags.module';
import { FeedToggleModule } from '../shared/modules/feed-toggle/feed-toggle.module';
import { TagFeedComponent } from './components/tag-feed/tag-feed.component';

const routes: Routes = [{
  path: 'tags/:slug',
  component: TagFeedComponent
}];

@NgModule({
  declarations: [TagFeedComponent],
  imports: [
    CommonModule,
    BannerModule,
    FeedModule,
    PopularTagsModule,
    FeedToggleModule,
    RouterModule.forRoot(routes)
  ]
})
export class TagFeedModule {
}
