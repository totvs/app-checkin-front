import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { LoginComponent } from '../login/login.component';
import { NotificationsService } from '../../fcm.service';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
  styleUrls: ['./events.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild('scheduleList') scheduleList: IonList;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  public token: string = localStorage.getItem('deviceUUID');

  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public fcm: NotificationsService,
    public loginComponent: LoginComponent,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loginComponent.completeAuthentication();
    this.updateSchedule();
  }

  checkin() {
    this.router.navigateByUrl('/checkin');
  }

  logOut() {
    this.loginComponent.logout();
  }

  updateSchedule() {

    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    // this.confData.getTimeline(this.queryText).subscribe((data: any) => {
    //   this.groups = data;
    // });
  }
}
