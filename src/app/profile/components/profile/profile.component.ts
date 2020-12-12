import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment, ParamMap, Router, Params } from '@angular/router';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { AppStateInterface } from 'src/app/shared/types/app-state.interface';
import { UserInterface } from 'src/app/shared/types/user.interface';
import { ProfileInterface } from 'src/app/shared/types/profile-interface';
import { userSelector } from 'src/app/auth/store/selectors';
import { getProfileAction } from '../../store/actions/get-profile.action';
import { errorSelector, isLoadingSelector, profileSelector } from '../../store/selectors';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isUserProfile$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  profileSubscription!: Subscription;

  profile!: ProfileInterface | null;
  slug!: string;

  get apiUrl(): string {
    return (this.router.url.includes('favorite')) ? `articles?favorited=${this.slug}` : `articles?author=${this.slug}`;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStateInterface>
  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.slug = this.route.snapshot.paramMap.get('slug') as string;

    this.isUserProfile$ = combineLatest<[UserInterface, ProfileInterface]>(
      this.store.pipe(
        select(userSelector),
        filter(Boolean)
      ),
      this.store.pipe(
        select(profileSelector),
        filter(Boolean)
      )
    ).pipe(
      map(([user, profile]: [UserInterface, ProfileInterface]): boolean => (user.username === profile.username))
    );
  }

  private initializeListeners(): void {
    this.profileSubscription = this.store
      .pipe(select(profileSelector))
      .subscribe((profile: ProfileInterface | null) => (this.profile = profile));

    this.route.params.subscribe((params: Params) => {
      this.slug = params.slug;
      this.fetchProfile();
    });
  }

  private fetchProfile(): void {
    this.store.dispatch(getProfileAction({ slug: this.slug }));
  }

}
