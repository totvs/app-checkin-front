import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CheckinPage } from './checkin';
import { CheckinPageRoutingModule } from './checkin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckinPageRoutingModule
  ],
  declarations: [
    CheckinPage,
  ]
})
export class CheckinModule { }
