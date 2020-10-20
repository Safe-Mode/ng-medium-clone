import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { FeedResponseInterface } from '../types/feed-response.interface';

@Injectable()
export class FeedService {

  constructor(private http: HttpClient) {
  }

  getFeed(url: string): Observable<FeedResponseInterface> {
    return this.http.get<FeedResponseInterface>(`${environment.apiUrl}/${url}`);
  }

}
