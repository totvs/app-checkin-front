import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../../base-url/base-url.service';
import { LoginComponent } from '../login/login.component';
import { UtilsService } from '../../utils.service.ts/utils.service';

@Injectable()
export class EventsDetailService {

  private eventsSurvey = this.baseUrl.getBaseUrl() + 'v1/survey/';
  private eventsSubscription = this.baseUrl.getBaseUrl() + 'subscribe/';
  private options = {headers: {}};
  private user;

  constructor(private http: HttpClient,
              private auth: LoginComponent,
              private baseUrl: BaseUrlService,
              private utilsService: UtilsService) {
                this.getUser();
              }

  async getUser() {
    return this.user = await this.auth.getUser();
  }

  survey(body = {}): Observable<any> {
    this.options.headers = {
      'Authorization': `${this.user.token_type} ${this.user.access_token}`
    };

    return this.http.post(this.eventsSurvey, body, this.options);
  }

  subscription(body = {}): Observable<any> {
    this.options.headers = {
      'Authorization': `${this.user.token_type} ${this.user.access_token}`
    };
    return this.http.post(this.eventsSubscription, body, this.options);
  }

  subscriptionDelete(eventCode): Observable<any> {
    this.options.headers = {
      'Authorization': `${this.user.token_type} ${this.user.access_token}`
    };
    return this.http.delete(`${this.eventsSubscription}${eventCode}`, this.options);
  }

}
