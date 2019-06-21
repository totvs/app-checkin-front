import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';

import { BaseUrlService } from '../base-url/base-url.service';

@Injectable({
  providedIn: 'root'
})
export class ConferenceData {

  data: any;

  private eventsApi = this.baseUrl.getBaseUrl() + 'v1/event/';
  private eventCode = '';

  constructor(
    public http: HttpClient,
    private baseUrl: BaseUrlService
  ) {}

  changeTimeZone(data) {
    data.forEach(element => {
      element.DATETIMESTART = element.DATETIMESTART.replace(/\s/g, 'T');
    });

    return data;
  }

  formatDate(date) {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  getTimeline(
    queryText: String = ''
  ) {
    return this.load().pipe(
      map((data: any) => {

        let dataReturn = [];
        const dataFilter = [];
        let search = null;
        let order = null;

        data.forEach( element => {

          search = dataReturn.map(function(e) { return e.date; }).indexOf(this.formatDate(element.DATETIMESTART.slice(0,10)));

          if ( search === -1 ) {
            dataReturn.push({date: this.formatDate(element.DATETIMESTART.slice(0,10)), itens: [element]});
          } else {
            dataReturn[search].itens.push(element);
          }
        });

        if (queryText) {
          dataReturn.forEach( element => {

            element.itens.forEach( element => {

            search = element.EVENT_NAME.toLowerCase().includes(queryText.toLowerCase());
  
            if (search) {
              dataFilter.push({date: this.formatDate(element.DATETIMESTART.slice(0,10)), itens: [element]});
            }
          });

        });
        }
        
        if(dataFilter.length) {
          return dataFilter; 
        } else { 
          return dataReturn;
        }

      })
    );
  }

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/events.json') //this.eventsApi
        .pipe(map(this.processData, this));
    }
  }

  loadId(event): any {
    this.eventCode = event;
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/events.json') //this.eventsApi
        .pipe(map(this.processDataId, this));
    }
  }

  processData(data: any) {
    return this.changeTimeZone(data["Itens"]);
  }

  processDataId(data: any) {
    let selected = {}
    data["Itens"].forEach(element => {
      if (element.EVENT_CODE === this.eventCode) {
        selected = element
      }
    });
    return selected;
  }

}
