import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { Platform, ToastController } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LoginComponent } from '../app/pages/login/login.component';
import { NotificationsService } from './fcm.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  appPages = [
    {
      title: 'Eventos',
      url: '/events',
      icon: 'calendar'
    }
  ];

  loggedIn = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private notificationsService: NotificationsService,
    private login: LoginComponent
    ) {
    this.initializeApp();
  }

  async ngOnInit() {

    await this.notificationsService.init();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });

    this.login.onCompleteAuthentication().subscribe(user => {
      let profileTitle = null;

      if (user && user.profile) {
        profileTitle = user.profile.name;
        if (Array.isArray(user.profile.name)) {
          profileTitle = user.profile.name[1];
        }
      }
    });
  }

  async initializeApp() {

    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      await this.notificationsService.requestPermission();

    });
  }

}
