import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ArticleService as SharedArticleService } from '../shared/services/article.service';
import { ArticleService } from './services/article.service';
import { ArticleComponent } from './components/article/article.component';
import { reducers } from './store/reducers';
import { GetArticleEffect } from './store/effects/get-article.effect';
import { DeleteArticleEffect } from './store/effects/delete-article.effect';
import { TagListModule } from '../shared/modules/tag-list/tag-list.module';
import { ErrorMessageModule } from '../shared/modules/error-message/error-message.module';
import { LoadingModule } from '../shared/modules/loading/loading.module';

const routes: Routes = [{
  path: 'articles/:slug',
  component: ArticleComponent
}];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ErrorMessageModule,
    TagListModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('article', reducers),
    EffectsModule.forFeature([
      GetArticleEffect,
      DeleteArticleEffect
    ]),
  ],
  providers: [
    SharedArticleService,
    ArticleService
  ]
})
export class ArticleModule {
}
