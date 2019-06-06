import { Component, OnInit } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { EventsDetailService } from './events-detail.service';
import { UtilsService } from '../../utils.service.ts/utils.service';

@Component({
  selector: 'page-events-detail',
  styleUrls: ['./events-detail.scss'],
  templateUrl: 'events-detail.html'
})
export class EventsDetailPage implements OnInit {

  defaultHref = '';
  isFavorite = false;
  rating;
  ratingDescription = '';
  session: any;
  subscriptionLabel = 'Inscreva-se';

  constructor(
    private dataProvider: ConferenceData,
    private utilsService: UtilsService,
    private eventsDetailService: EventsDetailService
  ) {}

  ngOnInit() {
    this.dataProvider.loadId().subscribe((data: any) => {
      this.session = data[0];
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/events`;
  }

  sessionClick(item: string) {
    console.log('Clicked', item);
  }

  eventsRating() {
    const body = {
      email: 'exemplo@totvs.com.br',
      event: this.session.Nome_Evento,
      note: this.rating,
      description: this.ratingDescription
    };

    let color;
    let message;

    this.eventsDetailService.rating(body).subscribe(response => {
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
      email: 'exemplo@totvs.com.br',
      code_event: '001',
      date: new Date().toISOString()
    };

    let color;
    let message;

    this.eventsDetailService.subscription(body).subscribe(response => {
      message = `Você está inscrito no evento: ${this.session.Nome_Evento}`;
      color = 'success';
      this.utilsService.presentToast(message, color);
    }, err => {
      message = `Não foi possível concluir a inscrição no evento: ${this.session.Nome_Evento}`;
      color = 'warning';
      this.utilsService.presentToast(message, color);
    });
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

    const message = this.isFavorite ? `Inscrição efetuada no evento: ${this.session.Nome_Evento}` :
      `Inscrição removida do evento: ${this.session.Nome_Evento}`;

    const color = this.isFavorite ? 'success' : 'warning';

    this.utilsService.presentToast(message, color);
  }

}
