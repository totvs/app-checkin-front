import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../base-url/base-url.service';
import { UtilsService } from '../utils.service.ts/utils.service';
import { LoginComponent } from '../pages/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  data: any;
  private options = {headers: {}};
  private user;

  constructor(
    public http: HttpClient,
    private baseUrlService: BaseUrlService,
    private utilsService: UtilsService,
    private auth: LoginComponent
  ) {
    this.getUser();
  }

  async getUser() {
    return this.user = await this.auth.getUser();
  }

  signup(body = {}): Observable<any> {

    this.options.headers = {
      'Authorization': `${this.user.token_type} ${this.user.access_token}`
    };

    return this.http.post(this.baseUrlService.getBaseUrl() + 'v1/signup', body, this.options);
  }

}
