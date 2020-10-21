import { Component } from '@angular/core';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent {
  apiUrl = '/articles/feed';
}
