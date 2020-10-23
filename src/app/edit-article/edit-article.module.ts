import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EditArticleService } from './services/edit-article.service';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import { LoadingModule } from '../shared/modules/loading/loading.module';
import { ArticleFormModule } from '../shared/modules/article-form/article-form.module';
import { reducers } from './store/reducers';
import { UpdateArticleEffect } from './store/effects/update-article.effect';

const routes: Routes = [{
  path: 'articles/new',
  component: EditArticleComponent
}];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ArticleFormModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('editArticle', reducers),
    EffectsModule.forFeature([UpdateArticleEffect])
  ],
  providers: [EditArticleService]
})
export class EditArticleModule {
}
