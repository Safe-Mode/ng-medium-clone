import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../shared/types/app-state.interface';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { updateArticleAction } from '../../store/actions/update-article.action';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  isLoading$?: Observable<boolean>;
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));
  errors$?: Observable<BackendErrorsInterface | null>;

  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  slug?: string;

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  onSubmit(input: ArticleInputInterface): void {
    if (this.slug) {
      this.store.dispatch(updateArticleAction({ slug: this.slug, input }));
    }
  }

  private initializeValues(): void {
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
  }

}
