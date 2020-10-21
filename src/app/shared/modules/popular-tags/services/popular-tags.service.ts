import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../../../environments/environment';
import { PopularTagsResponseInterface } from '../types/popular-tags-response.interface';
import { TagType } from '../../../types/tag.type';

@Injectable()
export class PopularTagsService {

  constructor(private http: HttpClient) {
  }

  fetchTags(): Observable<TagType[]> {
    return this.http
      .get<PopularTagsResponseInterface>(`${environment.apiUrl}/tags`)
      .pipe(
        map(({ tags }: PopularTagsResponseInterface) => tags)
      );
  }

}
