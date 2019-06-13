import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { LoginComponent } from '../pages/login/login.component';

@Injectable()
export class UtilsService {

  constructor(private toastController: ToastController) {
  }

  async presentToast(message = '', color = 'success', duration = 2000, header = '') {

    const toast = await this.toastController.create({
      message,
      header,
      duration,
      position: 'bottom',
      color
    });
    toast.present();
  }

  getSessionData() {
    return JSON.parse(sessionStorage.getItem('oidc.user:https://universo.rac.totvs.io/totvs.rac:universototvs2019'));
  }

  setLocalStorage(key = '', value) {
    localStorage.setItem(key, value);
  }

}
