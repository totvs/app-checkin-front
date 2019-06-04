import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'checkin',
    loadChildren: './pages/checkin/checkin.module#CheckinModule'
  },
  {
    path: 'events',
    loadChildren: './pages/events/events.module#EventsModule'
  },
  {
    path: 'events/:id',
    loadChildren: './pages/events-detail/events-detail.module#EventsDetailModule'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
