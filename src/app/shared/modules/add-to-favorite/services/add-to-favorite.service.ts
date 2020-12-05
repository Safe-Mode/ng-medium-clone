import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../../../../environments/environment';
import { ArticleResponseInterface } from './../../../types/article-response.interface';

@Injectable()
export class AddToFavoriteService {

  constructor(private http: HttpClient) {
  }

  addToFavorite(slug: string): Observable<ArticleResponseInterface> {
    return this.http.post<ArticleResponseInterface>(this.getUrl(slug), {});
  }

  deleteFromFavorite(slug: string): Observable<ArticleResponseInterface> {
    return this.http.delete<ArticleResponseInterface>(this.getUrl(slug));
  }

  private getUrl(slug: string): string {
    return `${environment.apiUrl}/articles/${slug}/favorite`;
  }

}
