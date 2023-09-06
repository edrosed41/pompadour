import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/common/services/loading/loading.service';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { ToastService } from 'src/app/common/services/toast/toast.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
  maxStarRating = 5; // 5 star rating setup
  feedback: any;
  star = 0;
  params: any;

  constructor(
    private modalCtrl: ModalController,
    private loadingSvc: LoadingService,
    private appointmentSvc: AppointmentService,
    private toastSvc: ToastService
  ) { }

  ngOnInit() {
    // console.log(this.params);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  arrayTransform(x: number) {
    return new Array(x);
  }

  starRating(starSelected: number) {
    this.star = starSelected;
  }

  submitRating() {
    if (this.star > 0) {
      this.loadingSvc.show();
      const ratingParams = {
        clientId: this.params.clientId,
        serviceProviderId: this.params.serviceProviderId,
        bookingId: this.params.bookingId,
        rating: this.star,
        remarks: this.feedback
      };

      this.appointmentSvc.rateBooking(ratingParams).subscribe((res: any) => {
        setTimeout(() => {
          this.loadingSvc.close();
          this.closeModal();
        }, 50);
      }, (err: any) => {
        console.log(err);
        this.loadingSvc.close();
      });
    } else {
      this.toastSvc.showErrorToast('Please select the appropriate star rating.');
    }
  }

}
