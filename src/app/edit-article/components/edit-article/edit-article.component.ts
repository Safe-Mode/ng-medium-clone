import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../shared/types/app-state.interface';
import { ArticleInputInterface } from '../../../shared/types/article-input.interface';
import { BackendErrorsInterface } from '../../../shared/types/backend-errors.interface';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { updateArticleAction } from '../../store/actions/update-article.action';
import { getArticleAction } from '../../store/actions/get-article.action';
import { articleSelector, isLoadingSelector, isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  isLoading$?: Observable<boolean>;
  errors$?: Observable<BackendErrorsInterface | null>;
  initialValues$?: Observable<ArticleInputInterface>;
  isSubmitting$?: Observable<boolean>;

  slug?: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  onSubmit(input: ArticleInputInterface): void {
    if (this.slug) {
      this.store.dispatch(updateArticleAction({ slug: this.slug, input }));
    }
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.errors$ = this.store.pipe(select(validationErrorsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));

    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter((article: ArticleInterface | null) => Boolean(article)),
      map((article: ArticleInterface | null) => ({
        title: article?.title as string,
        description: article?.description as string,
        body: article?.body as string,
        tagList: article?.tagList as string[]
      }))
    );
  }

  private fetchData(): void {
    if (this.slug) {
      this.store.dispatch(getArticleAction({ slug: this.slug}));
    }
  }

}
