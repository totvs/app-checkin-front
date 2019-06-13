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

  constructor(
    public http: HttpClient,
    private baseUrlService: BaseUrlService,
    private utilsService: UtilsService,
    private auth: LoginComponent
  ) {}

  async signup(body = {}): Promise<Observable<any>> {
    const options = {headers: {}};
    const user = await this.auth.getUser();

    options.headers = {
      'Authorization': `${user.token_type} ${user.access_token}`
    };

    return this.http.post(this.baseUrlService.getBaseUrl() + 'v1/signup', body, options);
  }

}
