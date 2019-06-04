import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsDetailService {

  private eventsUrl = 'http://localhost:8180/api/v1/survey';

  constructor(private http: HttpClient) { }

  rating(body = {}): Observable<any> {
    return this.http.post(this.eventsUrl, body);
  }

}
