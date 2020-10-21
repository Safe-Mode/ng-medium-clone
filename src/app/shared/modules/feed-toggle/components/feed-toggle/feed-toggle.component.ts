import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../../../../types/app-state.interface';
import { loginStatusSelector } from '../../../../../auth/store/selectors';

@Component({
  selector: 'app-feed-toggle',
  templateUrl: './feed-toggle.component.html',
  styleUrls: ['./feed-toggle.component.scss']
})
export class FeedToggleComponent implements OnInit {

  @Input() tagName?: string;
  isLoggedIn$?: Observable<boolean | null>;

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  private initializeValues(): void {
    this.isLoggedIn$ = this.store.pipe(select(loginStatusSelector));
  }

}
