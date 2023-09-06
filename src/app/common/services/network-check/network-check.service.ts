import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NetworkCheckService {
  private status: boolean;
  constructor(private alertCtrl: AlertController) {
    this.status = navigator.onLine;
    window.addEventListener('online', () => {
      console.log('internet ocnnection up');
      this.status = true;
    });

    window.addEventListener('offline', () => {
      console.log('internet ocnnection down');
      this.status = false;
    });
  }

  networkStatus() {
    return this.status;
  }

  showNetworkStatusError() {
    this.presentNoNetworkAlert();
  }

  private async presentNoNetworkAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Network Error',
      subHeader: 'You are currently offline.',
      message: 'Sorry, we are unable to continue. Please kindly check your mobile data or internet connection',
      buttons: ['OK']
    });

    await alert.present();
  }

}
