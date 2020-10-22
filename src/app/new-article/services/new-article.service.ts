import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { ArticleInterface } from '../../shared/types/article.interface';
import { ArticleInputInterface } from '../../shared/types/article-input.interface';
import { NewArticleResponseInterface } from '../../shared/types/new-article-response.interface';

@Injectable()
export class NewArticleService {

  constructor(private http: HttpClient) {
  }

  createArticle(input: ArticleInputInterface): Observable<ArticleInterface> {
    return this.http
      .post<NewArticleResponseInterface>(`${environment.apiUrl}/articles`, input)
      .pipe(
        map(({ article }: NewArticleResponseInterface) => article)
      );
  }

}
