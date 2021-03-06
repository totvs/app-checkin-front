import {Injectable} from '@angular/core';

import {firebase} from '@firebase/app';
import '@firebase/messaging';

import { AppConfig } from './app.config';
import { UtilsService } from './utils.service.ts/utils.service';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  constructor(private appConfig: AppConfig, private utilsService: UtilsService) { }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      navigator.serviceWorker.register('./firebase-messaging-sw.js').then(function() {
        return navigator.serviceWorker.ready;
      });

      navigator.serviceWorker.ready.then((registration) => {

        if (firebase.messaging.isSupported()) {

          const messaging = firebase.messaging();

          if (!firebase.messaging.isSupported()) {
            resolve();
            return;
          }

          messaging.useServiceWorker(registration);

          messaging.usePublicVapidKey(
          this.appConfig.config['FB_VAPIDKEY']
          );

          messaging.onMessage((payload) => {
            console.log(payload);
            alert(payload.notification.body)
          });

          messaging.onTokenRefresh(() => {
            messaging.getToken().then(
            (refreshedToken: string) => {
                console.log(refreshedToken);
            }).catch((err) => {
                console.error(err);
            });
          });

          resolve();
        }
      }, (err) => {
        reject(err);
      });

    });
  }

  requestPermission(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      if (!Notification) {
        resolve();
        return;
      }
      if (!firebase.messaging.isSupported()) {
        resolve();
        return;
      }
      try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();

        const token: string = await messaging.getToken();
        this.utilsService.setLocalStorage('firebase-key', token);

        console.log('User notifications token:', token);
      } catch (err) {
        console.log(err);
      }

      resolve();
    });
  }

}
