import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { EventsDetailService } from './events-detail.service';
import { UtilsService } from '../../utils.service.ts/utils.service';
import { LoginComponent } from '../login/login.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-events-detail',
  styleUrls: ['./events-detail.scss'],
  templateUrl: 'events-detail.html'
})
export class EventsDetailPage implements OnInit {

  defaultHref = '';
  email = this.utilsService.getSessionData()['profile']['name'][0];
  isFavorite = false;
  rating;
  ratingDescription = '';
  event: any;
  subscriptionLabel = 'Inscreva-se';
  initial = false;

  constructor(
    private dataProvider: ConferenceData,
    private utilsService: UtilsService,
    private eventsDetailService: EventsDetailService,
    public loginComponent: LoginComponent,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route
      .params
      .subscribe(params => {
        this.dataProvider.loadId(params['id']).subscribe((data: any) => {
          this.event = data;
          if (localStorage.getItem(`subscribe_${data.EVENT_CODE}`)) {
            if (localStorage.getItem(`subscribe_${data.EVENT_CODE}`) === 'true') {
              this.subscriptionLabel = 'Desinscreva-se';
              this.initial = true;
              this.isFavorite = true;
            } else {
              this.subscriptionLabel = 'Inscreva-se';
            }
          }
        });
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/events`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  eventsSurvey() {
    const body = {
      email: this.email,
      code_event: this.event.EVENT_CODE,
      note: this.rating,
      description: this.ratingDescription
    };

    let color;
    let message;

    this.eventsDetailService.survey(body).subscribe(response => {
      message = 'Obrigado por avaliar';
      color = 'success';
      this.utilsService.presentToast(message, color);
      console.log(response);
    }, err => {
      message = 'Não foi possível concluir a avaliação';
      color = 'warning';
      this.utilsService.presentToast(message, color);
    });
  }

  eventsSubscription(subscribption) {
    const dateStart = new Date();
    dateStart.setMinutes(dateStart.getMinutes() + 2);
    const body = {
      email: this.email,
      eventCode: this.event.EVENT_CODE,
      eventDescription: this.event.DESCRIPTION,
      eventDuration: 0,
      eventName: this.event.EVENT_NAME,
      eventStartTime: this.event.DATETIMESTART,
      eventRoom: this.event.ROOM,
      enablePushNotification: true,
      NotificationService: localStorage.getItem('firebase-key') ? 'Firebase' : 'EngageSpot',
      notificationToken: localStorage.getItem('firebase-key') ? localStorage.getItem('firebase-key') :
        localStorage.getItem('deviceUUID')
    };

    let color;
    let message;

    if (subscribption) {
      this.eventsDetailService.subscription(body).subscribe(response => {
        message = `Você está inscrito no evento: ${this.event.EVENT_NAME}`;
        color = 'success';
        localStorage.setItem(`subscribe_${this.event.EVENT_CODE}`, 'true');
        this.utilsService.presentToast(message, color);
      }, err => {
        message = `Não foi possível concluir a inscrição no evento: ${this.event.EVENT_NAME}`;
        color = 'warning';
        this.utilsService.presentToast(message, color);
      });
    } else {
      this.eventsDetailService.subscriptionDelete(this.event.EVENT_CODE).subscribe(response => {
        message = `Sua inscrição no evento: ${this.event.EVENT_NAME} foi cancelada.`;
        color = 'success';
        localStorage.setItem(`subscribe_${this.event.EVENT_CODE}`, 'false');
        this.utilsService.presentToast(message, color);
      }, err => {
        message = `Não foi possível cancelar sua  a inscrição no evento: ${this.event.EVENT_NAME}`;
        color = 'warning';
        this.utilsService.presentToast(message, color);
      });
    }

  }

  logOut() {
    this.loginComponent.logout();
  }

  toggleSubscribe(event) {
    if (!this.initial) {
      if (!event.detail.checked) {
        this.isFavorite = false;
        this.subscriptionLabel = 'Inscreva-se';
        this.eventsSubscription(false);
        this.presentToast();
      } else {
        this.isFavorite = true;
        this.subscriptionLabel = 'Desinscreva-se';
        this.eventsSubscription(true);
        this.presentToast();
      }
    }
    this.initial = false;
  }

  async presentToast() {

    const message = this.isFavorite ? `Inscrição efetuada no evento: ${this.event.EVENT_NAME}` :
      `Inscrição removida do evento: ${this.event.EVENT_NAME}`;

    const color = this.isFavorite ? 'success' : 'warning';

    this.utilsService.presentToast(message, color);
  }

}
