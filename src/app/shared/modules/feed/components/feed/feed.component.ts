import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../../types/app-state.interface';
import { FeedResponseInterface } from '../../types/feed-response.interface';
import { getFeedAction } from '../../store/actions/get-feed.action';
import { errorSelector, feedSelector, isLoadingSelector } from '../../store/selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  @Input() apiUrl?: string;

  feed$?: Observable<FeedResponseInterface | null> | null;
  error$?: Observable<string | null> | null;
  isLoading$?: Observable<boolean>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(
      select((state: object) => feedSelector(state as AppStateInterface))
    );

    this.error$ = this.store.pipe(
      select((state: object) => errorSelector(state as AppStateInterface))
    );

    this.isLoading$ = this.store.pipe(
      select((state: object) => isLoadingSelector(state as AppStateInterface))
    );
  }

  fetchData(): void {
    if (this.apiUrl) {
      this.store.dispatch(getFeedAction({ url: this.apiUrl }));
    }
  }

}
