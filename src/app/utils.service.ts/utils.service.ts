import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { LoginComponent } from '../pages/login/login.component';

@Injectable()
export class UtilsService {

  private options = {headers: {}};
  private user;

  constructor(private toastController: ToastController, private auth: LoginComponent) {
    this.getUser();
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

  async getUser() {
    return this.user = await this.auth.getUser();
  }

  setHeader() {
    this.getUser();
    if (!this.options.headers) {
      this.options.headers = {
        'Authorization': `${this.user.token_type} ${this.user.access_token}`
      };
    }
    return  this.options;
  }

  setLocalStorage(key = '', value) {
    localStorage.setItem(key, value);
  }

}
