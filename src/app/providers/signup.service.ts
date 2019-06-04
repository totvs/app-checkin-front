import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  data: any;

  constructor(
    public http: HttpClient,
    public appConfig: AppConfig
  ) {}

  post(): Observable<any> {{
    const body = {
      email: '',
      macAddress: '',
      name: '',
      provider: ''

    }

    return this.http
      .post(this.appConfig.config['API_SIGNUP'], body)
    }
  }

}
