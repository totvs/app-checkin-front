import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  data: any;

  constructor(
    public http: HttpClient,
    public appConfig: AppConfig
  ) {}

  post(): Observable<any> {

    const body = {
      email: '',
      code_event: '',
      date: ''
    };

    return this.http.post(this.appConfig.config['API_CHECKIN'], body);
  }

}
