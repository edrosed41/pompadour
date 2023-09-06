import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/common/models/booking.model';
import { Notification, NotificationStatus } from 'src/app/common/models/notification.model';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/common/models/user.model';

import { LoadingService } from 'src/app/common/services/loading/loading.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Router, NavigationExtras } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastService } from 'src/app/common/services/toast/toast.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';
declare const google;

import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { NetworkCheckService } from 'src/app/common/services/network-check/network-check.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  geoCoder: any;
  barberBookings;
  notifications: Array<Notification> = new Array<Notification>();
  user: User = new User();
  filterNotifications: Array<Notification> = new Array<Notification>();
  notificationFilter: string;

  limit = 10;
  skip = 0;

  constructor(
    private userSvc: UserService,
    private loadingSvc: LoadingService,
    private notificationSvc: NotificationService,
    private router: Router,
    private toastSvc: ToastService,
    private geolocation: Geolocation,
    private platform: Platform,
    private fcm: FCM,
    private device: Device,
    private networkCheckSvc: NetworkCheckService
  ) { }

  ngOnInit() {
    this.user = this.userSvc.userInformation();
    this.intiNotifications();
    this.getUserCurrentLocation();
    this.getFCMRegistrationToken();
  }

  ionViewDidEnter() {
    this.initRating();
    this.initEarnings();
    this.notificationFilter = 'Active';
  }

  // Mock-up notificaitons
  intiNotifications() {
    if (this.networkCheckSvc.networkStatus()) {
      this.notificationSvc.getPushNotificationByReceiver(this.user.userId, this.limit, this.skip).subscribe((notifications: any) => {
        this.notificationSvc.storeNotificationsToLocalStorage(notifications);
        this.notifications = notifications;
        this.filterNotifications = this.notifications;
        this.selectFilter(this.notificationFilter);
      }, (err: any) => {
        console.log(JSON.stringify(err));
        console.log('Unable to retrieve notifications');
        // this.loadingSvc.show();
        this.toastSvc.showErrorToast('Unable to retrieve notifications');
      });
    } else {
      this.notificationSvc.getNotificationsFromLocalStorage().subscribe((notifications: any) => {
        this.notifications = notifications;
        this.filterNotifications = this.notifications;
        if (notifications) {
          this.selectFilter(this.notificationFilter);
        }
      });
    }
  }

  bookingDetails(notif: Notification) {
    if (this.networkCheckSvc.networkStatus()) {
      if (notif.status === NotificationStatus.ACTIVE) {
        this.loadingSvc.show();
        this.notificationSvc.updateNotificationStatusById(notif.id).subscribe(() => {
          this.redirectToAppropriatePage(notif);
          this.loadingSvc.close();
        }, (err: any) => {
          console.log(JSON.stringify(err));
          this.loadingSvc.close();
          this.intiNotifications();
        });
      } else {
        // this.goToBookingDetails(notif);
        this.redirectToAppropriatePage(notif);
      }
    } else {
      this.networkCheckSvc.showNetworkStatusError();
    }
  }

  redirectToAppropriatePage(notif: Notification) {
    if (this.networkCheckSvc.networkStatus()) {
      if (notif.notificationTypeId === 1) {
        this.router.navigate(['/ratings']);
      }
      else {
        this.goToBookingDetails(notif);
      }
    } else {
      this.networkCheckSvc.showNetworkStatusError();
    }
  }

  goToBookingDetails(notif: Notification) {
    if (notif.bookingId) {
      // redirect to booking detals
      const navigationExtras: NavigationExtras = {
        queryParams: {
          bookingIdParams: notif.bookingId
        }
      };
      this.router.navigate(['appointments/details'], navigationExtras);
    } else {
        // stay put
      // alert('No booking Id');
      console.log('No booking Id');
      this.toastSvc.showErrorToast('Booking Id is not available in this notifiaction.');
    }
  }

  reInitializeApplication(event: any) {
    this.skip = 0;
    this.limit = 10;
    this.intiNotifications();
    event.target.complete();
  }

  initRating() {
    this.userSvc.getUserRating().subscribe((r: any) => {
      this.user.rating = r;
    }, (err: any) => {
      console.log(err);
    });
  }

  initEarnings() {
    this.userSvc.getUserTotalEarnings().subscribe((res: any) => {
      this.user.totalEarnings = 0;
      for (const x of res) {
        this.user.totalEarnings = this.user.totalEarnings + x.sales;
      }

    }, (err: any) => {
      console.log(err);
    });
  }

  selectFilter(event: any) {
    // console.log(this.notificationFilter);
    this.filterNotifications = this.notifications;
    if (this.notificationFilter === 'Read') {
      this.filterNotifications = this.filterNotifications.filter(notif => {
        return notif.status === 'Read';
      });
    }
    else if (this.notificationFilter === 'Active'){
      this.filterNotifications = this.filterNotifications.filter(notif => {
        return notif.status === 'Active';
      });
    }
    else {
      // just do nothing
    }

    if (this.filterNotifications.length <= 5) {
      this.loadMoreNotification();
    }
  }

  loadMoreNotification(event?) {
    if (this.networkCheckSvc.networkStatus()) {
      this.skip = this.limit;
      this.limit = this.limit + 10;
      let insertedItems = 0;
      this.notificationSvc.getPushNotificationByReceiver(this.user.userId, this.limit, this.skip).subscribe((notifications: any) => {
        if (notifications.length > 0) {
          for (const n of notifications) {
            this.notifications.push(n);
            if (this.notificationFilter === 'All') {
              this.filterNotifications.push(n);
            }
            else {
              if (this.notificationFilter === n.status) {
                this.filterNotifications.push(n);
                insertedItems++;
              }
            }
          }
          if (this.filterNotifications.length <= 5 || insertedItems === 0) {
            this.loadMoreNotification();
          }
        }
        if (event) {
          event.target.complete();
        }
      }, (err: any) => {
        if (event) {
          event.target.complete();
        }
      });
    } else {
      if (event) {
        event.target.complete();
      }
    }
  }

  getUserCurrentLocation() {
    const geolocationOption = {
      timeout: 20000,
      enableHighAccuracy: true,
      maximumAge: 3600
    };
    this.geoCoder = new google.maps.Geocoder();
    this.geolocation.getCurrentPosition(geolocationOption).then(
      (geolocationRes: any) => {
        const latLong = new google.maps.LatLng(geolocationRes.coords.latitude, geolocationRes.coords.longitude);
      }
    ).catch(
      (geolocationRrr: any) => {
        console.log(geolocationRrr);
      });
  }

  getFCMRegistrationToken() {
    if (!this.platform.is('mobileweb')) {
        this.fcm.getToken().then((tokenRes: any) => {
          this.userSvc.saveRegistrationToken(tokenRes, this.device.uuid).subscribe(
            (regRes) => {
              console.log(regRes);
            },
            (regErr) => {
              console.log(regErr);
            }
          );
        }).catch((errRes: any) => {
          console.log(errRes);
        });
    }
  }

}
