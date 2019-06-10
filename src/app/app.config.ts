import { tap } from 'rxjs/operators';

import { Injector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { firebase } from '@firebase/app';

@Injectable()
export class AppConfig {
  public config = null;

  constructor (private injector: Injector) {}

  public load(): Promise<any> {
    const http = this.injector.get(HttpClient);
    return http.get<any>(`config/config.json`).pipe(
      tap(result => {
        this.config = result;

        const firebaseEnv = {
          apiKey: result['FB_APIKEY'],
          authDomain: result['FB_AUTHDOMAIN'],
          databaseURL: result['FB_DATABASE_URL'],
          projectId: result['FB_PROJECTID'],
          storageBucket: result['FB_STORAGEBUCKET'],
          messagingSenderId: result['FB_MSGSENDERID'],
          appId: result['FB_APPID'],
          vapidKey: result['FB_VAPIDKEY']
        };

        AngularFireModule.initializeApp(firebaseEnv);
        firebase.initializeApp(firebaseEnv);

      })
    ).toPromise();
  }

}
