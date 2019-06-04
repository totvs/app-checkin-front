import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EventsDetailPage } from './events-detail';
import { EventsDetailPageRoutingModule } from './events-detail-routing.module';

import { RatingComponent } from '../../rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EventsDetailPageRoutingModule
  ],
  declarations: [
    EventsDetailPage,
    RatingComponent
  ]
})
export class EventsDetailModule { }
