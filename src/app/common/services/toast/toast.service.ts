import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastModel, ToastPosition } from 'src/app/common/models/toast.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast;

  constructor(
    private toastCtrl: ToastController,
    private router: Router
  ) {

  }

  showAlertToast(toastOption: ToastModel) {
    toastOption.position = ToastPosition.TOP;
    toastOption.color = 'dark';
    toastOption.duration = 2000;
    this.presentToast(toastOption);
  }

  showErrorToast(message: string) {
    const toastErrorOption: ToastModel = new ToastModel();
    toastErrorOption.position = ToastPosition.TOP;
    toastErrorOption.color = 'danger';
    toastErrorOption.duration = 2000;
    toastErrorOption.message = message;
    this.presentToast(toastErrorOption);
  }

  showSuccessToast(message: string) {
    const toastSuccessOption: ToastModel = new ToastModel();
    toastSuccessOption.position = ToastPosition.TOP;
    toastSuccessOption.color = 'success';
    toastSuccessOption.duration = 2000;
    toastSuccessOption.message = message;
    this.presentToast(toastSuccessOption);
  }

  showBookingUpdateToast(toastOption: ToastModel) {
    this.presentBookingUpdateToast(toastOption);
  }

  async presentToast(toast: ToastModel) {
    this.toast = await this.toastCtrl.create({
      message: toast.message,
      duration: toast.duration,
      color: toast.color,
      position: toast.position,
      cssClass: 'custom-toast-design'
    });
    // console.log('present toast');
    this.toast.present();
  }

  async presentBookingUpdateToast(toastOption: ToastModel) {
    this.toast = await this.toastCtrl.create({
      message: toastOption.message,
      duration: 10000,
      position: 'top',
      color: 'dark',
      cssClass: 'custom-toast-design',
      buttons: [
        {
          text: 'View',
          role: 'close',
          handler: () => {
            this.router.navigate(['appointments/details'], toastOption.navigationExtras);
          }
        }
      ]
    });
    this.toast.present();
  }
}
