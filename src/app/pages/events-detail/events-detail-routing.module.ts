import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsDetailPage } from './events-detail';

const routes: Routes = [
  {
    path: '',
    component: EventsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsDetailPageRoutingModule { }
