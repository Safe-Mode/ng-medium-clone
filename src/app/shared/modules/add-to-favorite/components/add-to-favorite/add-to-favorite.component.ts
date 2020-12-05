import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { loginStatusSelector } from './../../../../../auth/store/selectors';
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

  constructor(
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.store
      .pipe(
        take(1),
        select(loginStatusSelector)
      )
      .subscribe((isLoggedIn: boolean | null) => this.isLoggedIn = isLoggedIn);
  }

  onAddToFavorite(evt: MouseEvent): void {
    evt.preventDefault();

    if (this.isLoggedIn) {
      this.store.dispatch(toggleIsFavoriteAction({ isFavorite: this.isFavorite, articleSlug: this.articleSlug }));
      (this.isFavorite) ? this.favoritesCount-- : this.favoritesCount++;
      this.isFavorite = !this.isFavorite;
    } else {
      this.router.navigateByUrl('/login');
    }
  }

}
