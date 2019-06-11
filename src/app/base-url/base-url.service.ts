import { Injectable } from '@angular/core';

@Injectable()
export class BaseUrlService {

  baseUrl = 'https://checkin.totvs.io/api/';

  constructor() { }

  getBaseUrl() {
    return this.baseUrl;
  }

}
