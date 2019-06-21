import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { LoginComponent } from '../login/login.component';
import { NotificationsService } from '../../fcm.service';
import { UtilsService } from '../../utils.service.ts/utils.service';

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
    public toastCtrl: ToastController,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
   this.bellStyle();
    this.loginComponent.completeAuthentication();
    this.updateSchedule();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    const current_time = new Date().getTime();

    if (this.utilsService.getSessionData()) {
      if (!this.utilsService.getSessionData()['expirest_at']) {
        this.router.navigateByUrl('/login');
      } else if (current_time > this.utilsService.getSessionData()['expirest_at']) {
        this.utilsService.presentToast('Efetue o login novamente', 'success', 2000, 'Universo Totvs');
        this.logOut();
      }
    }
  }

  checkin() {
    this.router.navigateByUrl('/checkin');
  }

  bellStyle() {
    let bell = document.getElementById('wholeContainer');
    if (bell) {
      bell.style.top = '1%';
      bell.style.left = '80%';
    }
  }

  doRefresh(event) {
    this.updateSchedule();

    setTimeout(() => {
      console.log('Async operation has ended');
    }, 2000);
      event.target.complete();
  }

  logOut() {
    this.loginComponent.logout();
  }

  updateSchedule() {

    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.queryText).subscribe((data: any) => {
      this.groups = data;
    });
  }
}
