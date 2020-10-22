import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ArticleResponseInterface } from '../types/article-response.interface';
import { ArticleInterface } from '../types/article.interface';

@Injectable()
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getArticle(slug: string): Observable<ArticleInterface> {
    return this.http
      .get<ArticleResponseInterface>(`${environment.apiUrl}/articles/${slug}`)
      .pipe(
        map(({ article }: ArticleResponseInterface) => article)
      );
  }

}
