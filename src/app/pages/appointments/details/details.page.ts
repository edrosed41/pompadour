import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Appointment, AppointmentStatus, AppointmentStatusCode } from 'src/app/common/models/appointment.model';
import { BookingCustomerAccount } from 'src/app/common/models/bookiing-customer-account.model';

import { LoadingService } from 'src/app/common/services/loading/loading.service';

import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProductsAndServicesService } from 'src/app/services/products-and-services/products-and-services.service';

import { Notification } from 'src/app/common/models/notification.model';
import { NotificationAssembler } from 'src/app/common/helpers/notifcation-assemble.helper';

import { forkJoin } from 'rxjs';
import { RatingPage } from '../../modals/rating/rating.page';

import { ToastService } from 'src/app/common/services/toast/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  bookingIdParams: any = null;
  isPastBooking: boolean;
  bookingDateTime: string;
  appointmentDetails: any = new Appointment();
  bookingCustomerAccount: BookingCustomerAccount = new BookingCustomerAccount();
  appontmentStatus: typeof AppointmentStatus;
  clientRegistrationToken: any = null;

  isAllowedToArrive = false;

  enableFeedback = false;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private appointmentSvc: AppointmentService,
    private userSvc: UserService,
    private loadingSvc: LoadingService,
    private notificationSvc: NotificationService,
    private productAndServiceSvc: ProductsAndServicesService,
    private modalCtrl: ModalController,
    private toastSvc: ToastService
  ) {
  }

  ngOnInit() {
    this.bookingIdParams = this.router.getCurrentNavigation().extras.queryParams?.bookingIdParams;
    this.appontmentStatus = AppointmentStatus;
    this.initBookingDetails();
  }

  initBookingDetails() {
    this.loadingSvc.show();
    this.appointmentSvc.getBookingById(this.bookingIdParams).subscribe((getBookingRes: any) => {
      this.appointmentDetails = getBookingRes;
      this.initBookingCustomerAccount();
      this.initBookingDateTime();
      this.checkIfPastBooking();
      forkJoin({
        serviceOffered: this.productAndServiceSvc.getServiceOfferedById(this.appointmentDetails.serviceOfferedId),
        // registrationToken: this.productAndServiceSvc.getServiceOfferedById(this.appointmentDetails.serviceOfferedId)
        registrationToken: this.userSvc.getUserRegistrationToken(this.appointmentDetails.clientId),
        rating: this.appointmentSvc.getRatingByBookingId(this.appointmentDetails.bookingId),
      }).subscribe((forkJoinRes: any) => {
        // console.log(forkJoinRes);
        this.appointmentDetails.serviceSelected = forkJoinRes.serviceOffered[0];
        this.clientRegistrationToken = forkJoinRes.registrationToken;
        // console.log(this.clientRegistrationToken);
        this.productAndServiceSvc.getPackageById(this.appointmentDetails.serviceSelected.packageId).subscribe(
          (getPackageRes: any) => {
            console.log(getPackageRes);
            this.appointmentDetails.serviceSelected.package = getPackageRes;
            console.log(this.appointmentDetails);
            this.loadingSvc.close();
        }, (getPackageErr: any) => {
          // alert('Unable to retrieve booking');

          this.loadingSvc.close();
          this.exitBookingDetails();
        });
        // console.log('rating');
        // console.log(forkJoinRes.rating);
        if (forkJoinRes.rating.length <= 0) {
          this.enableFeedback =  true;
        }
      }, (forkJoinErr: any) => {
        // alert('Unable to retrieve booking');
        this.toastSvc.showErrorToast('Unable to retrieve booking information');
        this.loadingSvc.close();
        this.exitBookingDetails();
      });
    }, (getBookingError: any) => {
      // alert('Unable to retrieve booking');
      this.toastSvc.showErrorToast('Unable to retrieve booking information');
      this.loadingSvc.close();
      this.exitBookingDetails();
    });
  }


  exitBookingDetails() {
    this.router.navigate(['tabs/tabs/appointments'], { replaceUrl: true });
  }

  initBookingDateTime() {
    // console.log('init bookingdatetime');
    // console.log(this.appointmentDetails);
    this.bookingDateTime = moment(this.appointmentDetails.date + ' ' + this.appointmentDetails.time, ['YYYY-MM-DD h:mm A']).toISOString();
    // console.log('BOOKING DATE TIME: ' + this.bookingDateTime);
  }

  checkIfPastBooking() {
    // tslint:disable-next-line: max-line-length
    this.isPastBooking = moment().isAfter(moment(this.appointmentDetails.date + ' ' + this.appointmentDetails.time, ['YYYY-MM-DD h:mm A']).add(this.appointmentDetails.duration, 'minutes'));
  }

  initBookingCustomerAccount() {
    // const userInfo = this.appointmentDetails.userInformation();
    // console.log(this.appointmentDetails);
    this.bookingCustomerAccount.email = this.appointmentDetails.emailAddress || 'N/A';
    this.bookingCustomerAccount.fullName = this.appointmentDetails.clientName;
    this.bookingCustomerAccount.mobileNumber = this.appointmentDetails.contactno || 'N/A';
    this.bookingCustomerAccount.address = this.appointmentDetails.address || 'N/A';
    this.bookingCustomerAccount.addressDetail = this.appointmentDetails.addressDetail || 'N/A';
    this.bookingCustomerAccount.notes = this.appointmentDetails.remarks || 'N/A';
  }

  // confirmAppointment() {
  //   this.showAcceptAlert();
  // }

  // declineAppointment() {
  //   this.showDeclineAlert();
  // }

  // async showAcceptAlert() {
  //   const alertComponent = await this.alertCtrl.create({
  //     cssClass: 'decline-alert-style',
  //     header: 'Confirm Appointment!',
  //     message: 'By confirming this appointment we are assuming that you have already read and understand our policy.',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: '',
  //         handler: () => {
  //           console.log('Decline Cancelled');
  //         }
  //       }, {
  //         text: 'Confirm',
  //         handler: (alertData: any) => {
  //           this.loadingSvc.show();
  //           // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: max-line-length
  //           this.appointmentSvc.updateBookingStatus(this.appointmentDetails.bookingId, AppointmentStatus.ACCEPTED, AppointmentStatusCode.ACCEPTED, '').subscribe((res: any) => {
  //               const notif: any = NotificationAssembler(
  //                 this.appontmentStatus.ACCEPTED,
  //                 this.appointmentDetails.bookingId,
  //                 this.appointmentDetails.referenceNo,
  //                 this.clientRegistrationToken,
  //                 this.appointmentDetails.serviceProviderId,
  //                 this.appointmentDetails.clientId,
  //                 this.appointmentDetails.providerName,
  //                 this.appointmentDetails.clientName
  //               );
  //               this.notificationSvc.sendPushNotification(notif).subscribe((sendPushResonse: any) => {
  //                 console.log(sendPushResonse);
  //                 this.loadingSvc.close();
  //                 this.router.navigate(['tabs/tabs/appointments'], { replaceUrl: true });
  //               }, (err: any) => {
  //                 console.log('Error sending push notification');
  //                 this.appointmentDetails.status = AppointmentStatus.ACCEPTED;
  //                 alert('Error: ' + JSON.stringify(err));
  //                 this.loadingSvc.close();
  //               });
  //           }, (err: any) => {
  //             console.log(err);
  //             this.loadingSvc.close();
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alertComponent.present();
  // }


  // async showDeclineAlert() {
  //   const alertDecline = await this.alertCtrl.create({
  //     cssClass: 'decline-alert-style',
  //     header: 'Decline Appointment!',
  // tslint:disable-next-line: max-line-length
  //     message: 'Are you sure want to decline this appointment? If so, we are assuming that you have already read and understand our policy regarding on declining an appointments.',
  //     inputs: [
  //       {
  //         name: 'reason',
  //         id: 'reason',
  //         type: 'textarea',
  //         placeholder: 'Please specify the reason why you want to decline this appontment'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: '',
  //         handler: () => {
  //           console.log('Decline Cancelled');
  //         }
  //       }, {
  //         text: 'Decline',
  //         handler: (alertData: any) => {
  //           this.loadingSvc.show();
  //           // tslint:disable-next-line: max-line-length
  // tslint:disable-next-line: max-line-length
  //           this.appointmentSvc.updateBookingStatus(this.appointmentDetails.bookingId, AppointmentStatus.REJECTED, AppointmentStatusCode.REJECTED, alertData.reason).subscribe((res: any) => {
  //             // console.log(res);
  //             // this.userSvc.getUserRegistrationToken(this.appointmentDetails.clientId).subscribe((userRegistrationToken: any) => {
  //               // console.log(res);
  //               const notif: any = NotificationAssembler(
  //                 this.appontmentStatus.REJECTED,
  //                 this.appointmentDetails.bookingId,
  //                 this.appointmentDetails.referenceNo,
  //                 // userRegistrationToken.registrationToken,
  //                 this.clientRegistrationToken,
  //                 this.appointmentDetails.serviceProviderId,
  //                 this.appointmentDetails.clientId,
  //                 this.appointmentDetails.providerName,
  //                 this.appointmentDetails.clientName
  //               );
  //               this.notificationSvc.sendPushNotification(notif).subscribe((sendPushResonse: any) => {
  //                 console.log(sendPushResonse);
  //                 // this.appointmentDetails.status = AppointmentStatus.
  //                 this.loadingSvc.close();
  //                 this.router.navigate(['tabs/tabs/appointments'], { replaceUrl: true });
  //               }, (err: any) => {
  //                 console.log('Error sending push notification');
  //                 alert('Error: ' + JSON.stringify(err));
  //                 this.loadingSvc.close();
  //               });
  //             // }, (err: any) => {
  //             //   console.log(err);
  //             //   alert('Unable to retrieve user\'s registration token. ' + JSON.stringify(err));
  //             //   this.loadingSvc.close();
  //             // });

  //           }, (err: any) => {
  //             console.log(err);
  //             this.loadingSvc.close();
  //           });
  //         }
  //       }
  //     ]
  //   });

  //   await alertDecline.present();
  // }


  confirmOnTheWay() {
      this.loadingSvc.show();
      // tslint:disable-next-line: max-line-length
      this.appointmentSvc.updateBookingStatus(this.appointmentDetails.bookingId, AppointmentStatus.ON_THE_WAY, AppointmentStatusCode.ON_THE_WAY, '').subscribe((res: any) => {
              this.appointmentDetails.status = AppointmentStatus.ON_THE_WAY;
              const notif: any = NotificationAssembler(
                  this.appontmentStatus.ON_THE_WAY,
                  this.appointmentDetails.bookingId,
                  this.appointmentDetails.referenceNo,
                  // userRegistrationToken.registrationToken,
                  this.clientRegistrationToken,
                  this.appointmentDetails.serviceProviderId,
                  this.appointmentDetails.clientId,
                  this.appointmentDetails.providerName,
                  this.appointmentDetails.clientName
              );
              this.notificationSvc.sendPushNotification(notif).subscribe((sendPushResonse: any) => {
                  console.log(sendPushResonse);
                  this.loadingSvc.close();
              }, (err: any) => {
                  console.log('Error sending push notification');
                  alert('Error: ' + JSON.stringify(err));
                  this.loadingSvc.close();
              });
      }, (err: any) => {
          console.log(err);
          this.loadingSvc.close();
      });
    }

    confirmArrived() {
        this.loadingSvc.show();
        // tslint:disable-next-line: max-line-length
        this.appointmentSvc.updateBookingStatus(this.appointmentDetails.bookingId, AppointmentStatus.ARRIVED, AppointmentStatusCode.ARRIVED, '').subscribe((res: any) => {
                this.appointmentDetails.status = AppointmentStatus.ARRIVED;
                const notif: any = NotificationAssembler(
                    this.appontmentStatus.ARRIVED,
                    this.appointmentDetails.bookingId,
                    this.appointmentDetails.referenceNo,
                    // userRegistrationToken.registrationToken,
                    this.clientRegistrationToken,
                    this.appointmentDetails.serviceProviderId,
                    this.appointmentDetails.clientId,
                    this.appointmentDetails.providerName,
                    this.appointmentDetails.clientName
                );
                this.notificationSvc.sendPushNotification(notif).subscribe((sendPushResonse: any) => {
                    console.log(sendPushResonse);
                    this.loadingSvc.close();
              }, (err: any) => {
                  console.log(err);
                  // alert('Unable to retrieve user\'s registration token. ' + JSON.stringify(err));
                  this.loadingSvc.close();
              });

        }, (err: any) => {
            console.log(err);
            this.loadingSvc.close();
        });
    }

    confirmStartAppointment() {
        this.loadingSvc.show();
        // tslint:disable-next-line: max-line-length
        this.appointmentSvc.updateBookingStatus(this.appointmentDetails.bookingId, AppointmentStatus.IN_PROGRESS, AppointmentStatusCode.IN_PROGRESS, '').subscribe((res: any) => {
                this.appointmentDetails.status = AppointmentStatus.IN_PROGRESS;
                const notif: any = NotificationAssembler(
                    this.appontmentStatus.IN_PROGRESS,
                    this.appointmentDetails.bookingId,
                    this.appointmentDetails.referenceNo,
                    // userRegistrationToken.registrationToken,
                    this.clientRegistrationToken,
                    this.appointmentDetails.serviceProviderId,
                    this.appointmentDetails.clientId,
                    this.appointmentDetails.providerName,
                    this.appointmentDetails.clientName
                );
                this.notificationSvc.sendPushNotification(notif).subscribe((sendPushResonse: any) => {
                    console.log(sendPushResonse);
                    this.loadingSvc.close();
              }, (err: any) => {
                  console.log(err);
                  // alert('Unable to retrieve user\'s registration token. ' + JSON.stringify(err));
                  this.loadingSvc.close();
              });

        }, (err: any) => {
            console.log(err);
            this.loadingSvc.close();
        });
    }

    confirmCompleted() {
        this.loadingSvc.show();
        // tslint:disable-next-line: max-line-length
        this.appointmentSvc.updateBookingStatus(this.appointmentDetails.bookingId, AppointmentStatus.COMPLETED, AppointmentStatusCode.COMPLETED, '').subscribe((res: any) => {
                this.appointmentDetails.status = AppointmentStatus.COMPLETED;
                const notif: any = NotificationAssembler(
                    this.appontmentStatus.COMPLETED,
                    this.appointmentDetails.bookingId,
                    this.appointmentDetails.referenceNo,
                    // userRegistrationToken.registrationToken,
                    this.clientRegistrationToken,
                    this.appointmentDetails.serviceProviderId,
                    this.appointmentDetails.clientId,
                    this.appointmentDetails.providerName,
                    this.appointmentDetails.clientName
                );
                this.notificationSvc.sendPushNotification(notif).subscribe((sendPushResponse: any) => {
                    this.loadingSvc.close();
                    // this.router.navigate(['tabs/tabs/appointments'], { replaceUrl: true });
                    this.openRatingModal();
              }, (err: any) => {
                  console.log(err);
                  // alert('Unable to retrieve user\'s registration token. ' + JSON.stringify(err));
                  this.loadingSvc.close();
              });

        }, (err: any) => {
            console.log(err);
            this.loadingSvc.close();
        });
    }

    providerUpdateLocation(event: any) {
      // tslint:disable-next-line: max-line-length
      this.appointmentSvc.addProviderBookingLocation(this.appointmentDetails.bookingId, event.latitude, event.longitude).subscribe((res: any) => {
        console.log('Successfully updated service provider location');
        // send this.notificationSvc
      }, (err: any) => {
        console.log(err);
        // alert('Unable to update service provider location: ' + JSON.stringify(err));
      });
    }

  isAllowedToOnTheWay(): boolean {
    const currentBookingDate = moment(this.appointmentDetails.date + ' ' + this.appointmentDetails.time, ['YYYY-MM-DD h:mm A']);
    if (moment().isBetween(moment(currentBookingDate).subtract(1, 'hour'), moment(currentBookingDate).add(30, 'minutes'))) {
      return true;
    }
    else {
      return false;
    }
  }

  enteredArrivalRadius(event) {
    if (event) {
      console.log('arrived button is now enabled.');
      this.isAllowedToArrive = true;
    }
  }

  openRatingModal() {
    this.ratingModalHandler();
  }

  async ratingModalHandler() {
    const ratingModal = await this.modalCtrl.create({
      component: RatingPage,
      componentProps: {
        params: this.appointmentDetails
      },
      cssClass: 'rating-modal'
    });

    ratingModal.onDidDismiss().then(data => {
      // console.log(data);
      this.enableFeedback = false;
    });

    return await ratingModal.present();
  }
}
