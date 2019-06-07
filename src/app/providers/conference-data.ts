import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceData {

  data: any;

  constructor(public http: HttpClient) {}

  formatDate(date) {
    return `${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`;
  }

  getTimeline(
    queryText: String = ''
  ) {
    return this.load().pipe(
      map((data: any) => {

        const dataReturn = [];
        const dataFilter = [];
        let search = null;

        data.forEach( element => {

          search = element.event_name.includes(queryText);

          if (search) {
            dataFilter.push({date: this.formatDate(element.dateTimeStart), itens: [element]});
          } else {
            dataReturn.push({date: this.formatDate(element.dateTimeStart), itens: [element]});
          }
        });

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
        .get('assets/data/events.json')
        .pipe(map(this.processData, this));
    }
  }

  loadId(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
        .get('assets/data/eventId.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    return data.data;
  }

}
