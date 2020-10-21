import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { stringify, parseUrl } from 'query-string';

import { environment } from '../../../../../../environments/environment';
import { AppStateInterface } from '../../../../types/app-state.interface';
import { FeedResponseInterface } from '../../types/feed-response.interface';
import { getFeedAction } from '../../store/actions/get-feed.action';
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {

  @Input() apiUrl?: string;

  feed$?: Observable<FeedResponseInterface | null> | null;
  error$?: Observable<string | null> | null;
  isLoading$?: Observable<boolean>;

  queryParamsSubscription?: Subscription;

  limit = environment.articlesPerPage;
  baseUrl?: string;
  currentPage?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    // this.fetchData();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.apiUrl) {
      this.apiUrl = changes.apiUrl.currentValue;
      this.fetchData();
    }
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params) => {
      this.currentPage = Number(params.page) || 1;
      this.fetchData();
    });
  }

  fetchData(): void {
    const offset = (this.currentPage) ? this.currentPage * this.limit - this.limit : 0;

    if (this.apiUrl) {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit: this.limit,
        offset,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;

      this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
    }
  }

}
