import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { TagType } from '../../../../types/tag.type';
import { AppStateInterface } from '../../../../types/app-state.interface';
import { errorSelector, isLoadingSelector, popularTagsSelector } from '../../store/selectors';
import { getTagsAction } from '../../store/actions/get-tags.action';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  isLoading$?: Observable<boolean | null>;
  popularTags$?: Observable<TagType[] | null>;
  error$?: Observable<string | null>;

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  private fetchData(): void {
    this.store.dispatch(getTagsAction());
  }

}
