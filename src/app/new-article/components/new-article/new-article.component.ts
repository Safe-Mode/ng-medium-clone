import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../shared/types/app-state.interface';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { createArticleAction } from '../../store/actions/create-article.action';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));
  errors$?: Observable<BackendErrorsInterface | null>;

  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  onSubmit(input: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({ input }));
  }

  private initializeValues(): void {
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
  }

}
