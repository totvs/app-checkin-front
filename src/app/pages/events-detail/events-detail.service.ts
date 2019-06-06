import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsDetailService {

  private eventsSurvey = 'http://localhost:8180/api/v1/survey';
  private eventsSubscription = 'http://localhost:8180/api/v1/survey';

  constructor(private http: HttpClient) { }

  rating(body = {}): Observable<any> {
    return this.http.post(this.eventsSurvey, body);
  }

  subscription(body = {}): Observable<any> {
    return this.http.post(this.eventsSubscription, body);
  }

}
