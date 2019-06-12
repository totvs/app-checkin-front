import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import jsQR from 'jsqr';

import { CheckinService } from '../../providers/checkin.service';
import { UtilsService } from '../../utils.service.ts/utils.service';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
  styleUrls: ['./checkin.scss'],
})
export class CheckinPage {

  public browser = navigator;
  public canvas;
  public canvasElement;
  public loadingMessage;
  public outputContainer;
  public outputData;
  public outputMessage;
  public req;
  public video;

  constructor(
    public router: Router,
    public toastController: ToastController,
    private checkinService: CheckinService,
    private utilsService: UtilsService
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    this.video = document.createElement('video');
    this.canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas = this.canvasElement.getContext('2d');
    this.loadingMessage = document.getElementById('loadingMessage');
    this.outputContainer = document.getElementById('output');
    this.outputMessage = document.getElementById('outputMessage');
    this.outputData = document.getElementById('outputData');

    this.browser.getUserMedia = (this.browser.getUserMedia);

    this.browser.mediaDevices.getUserMedia({ video: {facingMode: 'environment'}, audio: false }).then(stream => {
      this.video.srcObject = stream;
      this.video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
      this.video.play();

      this.req = window.requestAnimationFrame(() => this.tick());
    });

  }

  ionViewDidLeave() {
    this.video.srcObject.getTracks().forEach(function(track) { track.stop(); });
    window.cancelAnimationFrame(this.req);
  }

  drawLine(begin, end, color) {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }

  tick() {

    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.loadingMessage.hidden = true;
      this.canvasElement.hidden = false;
      this.outputContainer.hidden = false;
      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
        this.outputMessage.hidden = true;
        this.outputData.parentElement.hidden = false;
        this.outputData.innerText = code.data;
        window.cancelAnimationFrame(this.req);
        this.signUpPost(code.data);
      } else {
        this.drawLine({x: 140, y: 200}, {x: 330, y: 200}, '#0c9abe');
        this.drawLine({x: 140, y: 400}, {x: 330, y: 400}, '#0c9abe');

        this.drawLine({x: 140, y: 198}, {x: 140, y: 402}, '#0c9abe');
        this.drawLine({x: 330, y: 198}, {x: 330, y: 402}, '#0c9abe');

        this.outputMessage.hidden = false;
        this.outputData.parentElement.hidden = true;
      }
    }
    this.req = window.requestAnimationFrame(() => this.tick());
  }

  signUpPost(code_event = '') {

    const body = {
      email: this.utilsService.getSessionData()['profile']['name'][0],
      code_event,
      date: new Date().toISOString()
    };

    this.checkinService.signup(body).subscribe(res => {
      this.router.navigateByUrl('/events');
      this.utilsService.presentToast('Check-in Realizado com Sucesso', 'success', 3000, 'Universo TOTVS');
    }, err => {
      this.router.navigateByUrl('/events');
      this.utilsService.presentToast('Não foi possível realizar o check-in', 'warning', 3000, 'Universo TOTVS');
    });
  }

}

