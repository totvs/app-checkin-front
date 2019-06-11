import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../../base-url/base-url.service';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class EventsDetailService {

  private eventsSurvey = this.baseUrl.getBaseUrl() + 'v1/survey/';
  private eventsSubscription = this.baseUrl.getBaseUrl() + 'subscription/';
  private user;
  private options = {};

  constructor(private http: HttpClient, private baseUrl: BaseUrlService, private auth: LoginComponent) {
    this.getUser();
    this.options = {
      headers: {
        'Authorization': `${this.user.token_type} ${this.user.access_token}`
      }
    };
  }

  survey(body = {}): Observable<any> {
    return this.http.post(this.eventsSurvey, body, this.options);
  }

  subscription(body = {}): Observable<any> {
    return this.http.post(this.eventsSubscription, body, this.options);
  }

  async getUser() {
    return this.user = await this.auth.getUser();
  }

}
