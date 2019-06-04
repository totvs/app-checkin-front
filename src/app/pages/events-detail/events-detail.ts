import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';

import { ConferenceData } from '../../providers/conference-data';
import { EventsDetailService } from './events-detail.service';

@Component({
  selector: 'page-events-detail',
  styleUrls: ['./events-detail.scss'],
  templateUrl: 'events-detail.html'
})
export class EventsDetailPage implements OnInit {

  defaultHref = '';
  isFavorite = false;
  rating;
  session: any;

  constructor(
    private dataProvider: ConferenceData,
    private toastController: ToastController,
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
      event: 'Palestra',
      note: 5,
      description: 'Sugestão/critica da palestra'
    };

    this.eventsDetailService.rating(body).subscribe(response => {

    });
  }

  toggleSubscribe() {
    if (this.isFavorite) {
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
    }

    this.presentToast();
  }

  async presentToast() {

    const message = this.isFavorite ? `Inscrição efetuada no evento: ${this.session.Nome_Evento}` :
      `Inscrição removida do evento: ${this.session.Nome_Evento}`;

    const color = this.isFavorite ? 'success' : 'warning';

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

}
