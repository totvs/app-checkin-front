import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../../base-url/base-url.service';
import { UtilsService } from '../../utils.service.ts/utils.service';

@Injectable()
export class EventsDetailService {

  private eventsSurvey = this.baseUrl.getBaseUrl() + 'v1/survey/';
  private eventsSubscription = this.baseUrl.getBaseUrl() + 'subscription/';

  constructor(private http: HttpClient,
              private baseUrl: BaseUrlService,
              private utilsService: UtilsService) {}

  survey(body = {}): Observable<any> {
    return this.http.post(this.eventsSurvey, body, this.utilsService.setHeader());
  }

  subscription(body = {}): Observable<any> {
    return this.http.post(this.eventsSubscription, body, this.utilsService.setHeader());
  }

}
