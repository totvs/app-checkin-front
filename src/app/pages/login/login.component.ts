import { Component, OnInit } from '@angular/core';

import { User, UserManager, UserManagerSettings } from 'oidc-client';

import { AppConfig } from '../../app.config';

import { EventDispatcher, IEvent } from './events';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  private internalOnCompleteAuthentication: EventDispatcher<User> = new EventDispatcher<User>();
  private internalonAccessTokenExpired: EventDispatcher<boolean> = new EventDispatcher<boolean>();
  private manager: UserManager = new UserManager(this.getClientSettings());
  private user: User = null;

  constructor(private appConfig: AppConfig) {
    this.manager.events.addAccessTokenExpired(e => {
      this.internalonAccessTokenExpired.dispatch(true);
    });

    this.getUser().then(user => {
      this.user = user;

      if (this.user) {
        this.internalOnCompleteAuthentication.dispatch(user);
      }
    });
  }

  ngOnInit() {
    this.login();
  }

  async completeAuthentication(): Promise<void> {
    this.user = await this.manager.signinRedirectCallback();

    if (this.user && !this.user.expired) {
      this.internalOnCompleteAuthentication.dispatch(this.user);
    }
  }

  getClientSettings(): UserManagerSettings {

    const settings: UserManagerSettings = {
      authority: this.appConfig.config['RAC_AUTHORITY'],
      client_id: this.appConfig.config['RAC_CLIENTID'],
      redirect_uri: this.appConfig.config['RAC_REDIRECT_URI'],
      post_logout_redirect_uri: this.appConfig.config['RAC_POST_LOGOUT'],

      response_type: 'code id_token token',

      scope: 'openid profile email authorization_api offline_access',

      loadUserInfo: true,

      silent_redirect_uri: this.appConfig.config['RAC_SILENT_REDIRECT'],
      automaticSilentRenew: true,
      revokeAccessTokenOnSignout: true,
      monitorSession: true,
      filterProtocolClaims: false
    };

    return settings;
  }

  getUser(): Promise<User> {
    return this.manager.getUser();
  }

  isHostUser(): boolean {
    if (
      this.user == null ||
      this.user === undefined
    ) {
      return false;
    }

    return (this.user.profile.email === 'admin@universo.com.br');
  }

  logout() {
    this.manager.signoutRedirect().then(() => {
      this.manager.clearStaleState();
      this.user = null;
    });
  }

  login() {
    this.manager.signinRedirect();
  }

  onAccessTokenExpired: () => IEvent<boolean> =
    () => this.internalonAccessTokenExpired

  onCompleteAuthentication: () => IEvent<User> =
    () => this.internalOnCompleteAuthentication

}
