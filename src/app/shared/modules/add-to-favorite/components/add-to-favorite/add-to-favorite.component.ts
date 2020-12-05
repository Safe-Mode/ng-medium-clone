import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { UserInterface } from 'src/app/shared/types/user.interface';
import { loginStatusSelector, userSelector } from './../../../../../auth/store/selectors';
import { toggleIsFavoriteAction } from '../../store/actions/toggle-is-favorite.action';

@Component({
  selector: 'app-add-to-favorite',
  templateUrl: './add-to-favorite.component.html',
  styleUrls: ['./add-to-favorite.component.scss']
})
export class AddToFavoriteComponent implements OnInit {

  @Input() isFavorite!: boolean;
  @Input() favoritesCount!: number;
  @Input() articleSlug!: string;

  isLoggedIn!: boolean | null;
  authToken!: string | null;

  constructor(private store: Store<AppStateInterface>) {
  }

  ngOnInit(): void {
    this.store
      .pipe(select(loginStatusSelector))
      .subscribe((isLoggedIn: boolean | null) => (this.isLoggedIn = isLoggedIn));

    this.store
      .pipe(select(userSelector))
      .subscribe((user: UserInterface | null) => {
        if (user) {
          this.authToken = user.token;
        }
      });
  }

  onAddToFavorite(evt: MouseEvent): void {
    evt.preventDefault();

    if (this.isLoggedIn && this.authToken) {
      this.store.dispatch(toggleIsFavoriteAction({ articleSlug: this.articleSlug, authToken: this.authToken }));
    }
  }

}
