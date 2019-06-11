import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { EventsDetailService } from './events-detail.service';
import { UtilsService } from '../../utils.service.ts/utils.service';
import { LoginComponent } from '../login/login.component';

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

  constructor(
    private dataProvider: ConferenceData,
    private utilsService: UtilsService,
    private eventsDetailService: EventsDetailService,
    public loginComponent: LoginComponent,
  ) {}

  ngOnInit() {
    this.dataProvider.loadId().subscribe((data: any) => {
      this.event = data[0];
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
      code_event: this.event.event_code,
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

  eventsSubscription() {
    const body = {
      email: this.email,
      eventCode: this.event.event_code,
      eventDescription: this.event.description,
      eventDuration: 0,
      eventName: this.event.event_name,
      eventStartTime: new Date().toISOString(),
      eventRoom: this.event.room,
      enablePushNotification: true,
      notificationToken: localStorage.getItem('token_firebase') ? localStorage.getItem('token_firebase') :
        localStorage.getItem('deviceUUID')
    };

    let color;
    let message;

    this.eventsDetailService.subscription(body).subscribe(response => {
      message = `Você está inscrito no evento: ${this.event.event_name}`;
      color = 'success';
      this.utilsService.presentToast(message, color);
    }, err => {
      message = `Não foi possível concluir a inscrição no evento: ${this.event.event_name}`;
      color = 'warning';
      this.utilsService.presentToast(message, color);
    });
  }

  logOut() {
    this.loginComponent.logout();
  }

  toggleSubscribe() {
    if (this.isFavorite) {
      this.isFavorite = false;
      this.subscriptionLabel = 'Inscreva-se';
    } else {
      this.isFavorite = true;
      this.subscriptionLabel = 'Desinscreva-se';
      this.eventsSubscription();
    }

    this.presentToast();
  }

  async presentToast() {

    const message = this.isFavorite ? `Inscrição efetuada no evento: ${this.event.event_name}` :
      `Inscrição removida do evento: ${this.event.event_name}`;

    const color = this.isFavorite ? 'success' : 'warning';

    this.utilsService.presentToast(message, color);
  }

}
