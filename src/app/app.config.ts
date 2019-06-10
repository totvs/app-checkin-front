import { Injector, Injectable } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { firebase } from '@firebase/app';

import config from './../config/config.json';

@Injectable()
export class AppConfig {
  public config = null;

  constructor (private injector: Injector) {}

  public load(): Promise<any> {

    return new Promise((resolve, reject) => {
      this.config = config;

      const firebaseEnv = {
        apiKey: config['FB_APIKEY'],
        authDomain: config['FB_AUTHDOMAIN'],
        databaseURL: config['FB_DATABASE_URL'],
        projectId: config['FB_PROJECTID'],
        storageBucket: config['FB_STORAGEBUCKET'],
        messagingSenderId: config['FB_MSGSENDERID'],
        appId: config['FB_APPID'],
        vapidKey: config['FB_VAPIDKEY']
      };

      AngularFireModule.initializeApp(firebaseEnv);
      firebase.initializeApp(firebaseEnv);

      resolve();
    });

  }

}
