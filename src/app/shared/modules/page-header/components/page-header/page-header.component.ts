import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { NavLinkInterface } from '../../types/nav-link.interface';
import { AppStateInterface } from '../../../../types/app-state.interface';
import { UserInterface } from '../../../../types/user.interface';
import { loginStatusSelector, userSelector } from '../../../../../auth/store/selectors';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  guestLinks: NavLinkInterface[] = [{
    title: 'Sign In',
    link: '/login'
  }, {
    title: 'Sign Up',
    link: '/register'
  }];

  isLoggedIn?: boolean | null;
  navLinks?: NavLinkInterface[];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.getLoginStatus()
      .pipe(
        tap((isLoggedIn: boolean | null) => {
          if (!isLoggedIn) {
            this.navLinks = this.guestLinks;
          }
        }),
        switchMap(
          (isLoggedIn: boolean | null) => (isLoggedIn) ? this.store.pipe(
            select((state: object) => userSelector(state as AppStateInterface))
          ) : EMPTY
        )
      )
      .subscribe((user: UserInterface | null) => {
        if (user) {
          this.navLinks = this.getUserLinks(user);
        }
      });
  }

  getLoginStatus(): Observable<boolean | null> {
    return this.store.pipe(
      select((state: object) => loginStatusSelector(state as AppStateInterface))
    );
  }

  private getUserLinks(user: UserInterface): NavLinkInterface[] {
    return [{
      title: 'New Article',
      link: '/articles/new',
      icon: 'ion-compose'
    }, {
      title: 'Settings',
      link: '/settings',
      icon: 'ion-gear-a'
    }, {
      title: user.username,
      link: `/profiles/${user.username}`,
      icon: (user.image === null) ? 'ion-person' : '',
      image: user.image
    }];
  }

}
