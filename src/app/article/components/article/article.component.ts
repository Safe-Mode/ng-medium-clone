import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../shared/types/app-state.interface';
import { getArticleAction } from '../../store/actions/get-article.action';
import { ArticleInterface } from '../../../shared/types/article.interface';
import { UserInterface } from '../../../shared/types/user.interface';
import { deleteArticleAction } from '../../store/actions/delete-article.action';
import { articleSelector, errorSelector, isLoadingSelector } from '../../store/selectors';
import { userSelector } from '../../../auth/store/selectors';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  isLoading$?: Observable<boolean>;
  error$?: Observable<string | null>;
  isAuthor$?: Observable<boolean>;

  articleSubscription?: Subscription;

  slug?: string;
  article?: ArticleInterface | null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }

  deleteArticle(): void {
    if (this.slug) {
      this.store.dispatch(deleteArticleAction({ slug: this.slug }));
    }
  }

  private initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') as string;
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(userSelector))
    ).pipe(
      map(([article, user]: [ArticleInterface | null, UserInterface | null]) => {
        return (article && user) ? article.author.username === user.username : false;
      })
    );
  }

  private initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => this.article = article);
  }

  private fetchData(): void {
    if (this.slug) {
      this.store.dispatch(getArticleAction({ slug: this.slug }));
    }
  }

}
