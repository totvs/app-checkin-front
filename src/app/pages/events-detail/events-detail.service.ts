import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../../base-url/base-url.service';

@Injectable()
export class EventsDetailService {

  private eventsSurvey = this.baseUrl.getBaseUrl() + 'survey/';
  private eventsSubscription = this.baseUrl.getBaseUrl() + 'subscription/';

  constructor(private http: HttpClient, private baseUrl: BaseUrlService) { }

  rating(body = {}): Observable<any> {
    return this.http.post(this.eventsSurvey, body);
  }

  subscription(body = {}): Observable<any> {
    return this.http.post(this.eventsSubscription, body);
  }

}
