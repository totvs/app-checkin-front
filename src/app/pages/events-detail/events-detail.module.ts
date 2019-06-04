import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { EventsDetailPage } from './events-detail';
import { EventsDetailPageRoutingModule } from './events-detail-routing.module';
import { EventsDetailService } from './events-detail.service';

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
  ],
  providers: [EventsDetailService]
})
export class EventsDetailModule { }
