import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor(
    private loadingCtrl: LoadingController
  ) { }

  show() {
    this.present();
  }

  close() {
    this.loadingCtrl.dismiss();
  }
  async present() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      cssClass: 'custom-loading-class custom-spinner-class'
    });

    await loading.present();
  }
}
