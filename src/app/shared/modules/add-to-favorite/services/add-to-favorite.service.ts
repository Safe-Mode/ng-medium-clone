import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { ArticleResponseInterface } from './../../../types/article-response.interface';

@Injectable()
export class AddToFavoriteService {

  constructor(private http: HttpClient) {
  }

  addToFavorite(slug: string, authToken: string): Observable<ArticleResponseInterface> {
    return this.http.post<ArticleResponseInterface>(
      `${environment.apiUrl}/articles/${slug}/favorite`,
      {},
      { headers: new HttpHeaders({ authorization: '' }) }
    );
  }

  deleteFromFavorite() {

  }
}
