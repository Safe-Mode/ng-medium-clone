import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleFormComponent } from './components/article-form/article-form.component';
import { BackendErrorsModule } from '../backend-errors/backend-errors.module';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackendErrorsModule
  ],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule {
}
