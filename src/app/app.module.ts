import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppConfig } from './app.config';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BaseUrlService } from './base-url/base-url.service';
import { environment } from '../environments/environment';
import { InterceptorModule } from './pages/login/token.interceptor.module';
import { LoginComponent } from './pages/login/login.component';
import { NotificationsService } from './fcm.service';
import { UtilsService } from './utils.service.ts/utils.service';

export function loadConfig(config: AppConfig) {
  return async () => {await config.load(); };
}

@NgModule({
  imports: [
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    BrowserModule,
    HttpClientModule,
    InterceptorModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [AppComponent],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [AppConfig],
      multi: true
    },
    InAppBrowser,
    SplashScreen,
    StatusBar,
    LoginComponent,
    NotificationsService,
    UtilsService,
    BaseUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
