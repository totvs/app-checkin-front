import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CheckinPage } from './checkin';

const routes: Routes = [
  {
    path: '',
    component: CheckinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckinPageRoutingModule { }
