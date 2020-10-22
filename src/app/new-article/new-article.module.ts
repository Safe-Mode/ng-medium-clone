import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NewArticleService } from './services/new-article.service';
import { NewArticleComponent } from './components/new-article/new-article.component';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { reducers } from './store/reducers';
import { CreateArticleEffect } from './store/effects/create-article.effect';

const routes: Routes = [{
  path: 'articles/new',
  component: NewArticleComponent
}];

@NgModule({
  declarations: [NewArticleComponent],
  imports: [
    CommonModule,
    ArticleFormModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('newArticle', reducers),
    EffectsModule.forFeature([CreateArticleEffect])
  ],
  providers: [NewArticleService]
})
export class NewArticleModule {
}
