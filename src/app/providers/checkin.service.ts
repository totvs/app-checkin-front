import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseUrlService } from '../base-url/base-url.service';
import { UtilsService } from '../utils.service.ts/utils.service';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  data: any;

  constructor(
    public http: HttpClient,
    private baseUrlService: BaseUrlService,
    private utilsService: UtilsService
  ) {}

  signup(body = {}): Observable<any> {
    return this.http.post(this.baseUrlService.getBaseUrl() + 'v1/signup', body, this.utilsService.setHeader());
  }

}
