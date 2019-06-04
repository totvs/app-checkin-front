import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EventsPage } from './events';
import { EventsPageRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EventsPageRoutingModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    EventsPage,
  ],
  entryComponents: []
})
export class EventsModule { }
