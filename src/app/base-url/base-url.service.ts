import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlService {

  baseUrl = 'https://checkin.totvs.io/api/v1/';

  constructor() { }

  getBaseUrl() {
    return this.baseUrl;
  }

}
