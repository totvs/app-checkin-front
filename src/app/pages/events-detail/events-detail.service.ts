import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../../base-url/base-url.service';
import { LoginComponent } from '../login/login.component';

@Injectable()
export class EventsDetailService {

  private eventsSurvey = this.baseUrl.getBaseUrl() + 'survey/';
  private eventsSubscription = this.baseUrl.getBaseUrl() + 'subscribe/';
  private user;

  constructor(private http: HttpClient, private baseUrl: BaseUrlService, private auth: LoginComponent) {
    this.getUser();
  }

  survey(body = {}): Observable<any> {

    const options = {
      headers: {
        'Authorization': `${this.user.token_type} ${this.user.access_token}`
      }
    };

    return this.http.post(this.eventsSurvey, body, options);
  }

  subscription(body = {}): Observable<any> {
    return this.http.post(this.eventsSubscription, body);
  }

  async getUser() {
    return this.user = await this.auth.getUser();
  }

}
