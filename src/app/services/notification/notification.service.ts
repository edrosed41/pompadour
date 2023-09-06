import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Observable, from, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthService } from '../auth/auth.service';

import { Appointment, AppointmentStatus, AppointmentStatusCode } from 'src/app/common/models/appointment.model';
import { APIResponse } from 'src/app/common/models/api-response.model';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private authSvc: AuthService,
    private http: HttpClient,
    private localNotification: LocalNotifications,
    private platform: Platform,
    private storage: Storage
  ) { }

  sendPushNotification(notification: Notification): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.OTHERS + 'notification/send';
    return this.http.post(url, notification, httpOptions).pipe(map((res: APIResponse) =>  {
        console.log(res);
        return res.resultObject;
      },
      err => {
        console.log(err);
        return err;
      })
    );
  }

  savePushNotification(notification: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.OTHERS + 'notification/save';
    return this.http.post(url, notification, httpOptions).pipe(map((res: APIResponse) =>  {
        return res.resultObject;
      },
      err => {
        console.log(err);
        return err;
      }));
  }

  getPushNotificationByReceiver(receiverId: any, limit, skip): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authSvc.getAccessToken()
        })
      };

      const url = environment.CONSTANTS.API_URL.OTHERS + 'notification/0/' + receiverId + '/' + limit + '/' + skip;
      return this.http.get(url, httpOptions).pipe(map((res: APIResponse) =>  {
        return res.resultObject;
      },
      err => {
        console.log(err);
        return err;
      }));
  }

  updateNotificationStatusById(id: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authSvc.getAccessToken()
        })
      };

      const url = environment.CONSTANTS.API_URL.OTHERS + 'notification/0/' + id;
      return this.http.put(url, {}, httpOptions).pipe(map((res: APIResponse) =>  {
        console.log(res);
        return res.resultObject;
      },
      err => {
        console.log(err);
        return err;
      }));
  }

  saveFutureLocalNotifications(notificaitions: any) {
    // clear everything first
    notificaitions.reverse();
    if (!this.platform.is('mobileweb')) {
      this.localNotification.clearAll().then(() => {
        let i = 1;
        for (const n of notificaitions) {
          n.id = i;
          this.localNotification.schedule(notificaitions);
          i++;
        }
      }).catch((err: any) => {
        console.log(err);
        return err;
      });
    }
  }

  storeNotificationsToLocalStorage(notifications): Observable<any> {
    return from(this.platform.ready().then(
      () => {
        return this.storage.set(environment.STORAGE_KEYS.NOTIFICATIONS_KEY, notifications).then(
          res => {
            return res;
          });
      }));
  }

  getNotificationsFromLocalStorage(): Observable<any> {
    return from(
      this.platform.ready().then(
        () => {
          return this.storage.get(environment.STORAGE_KEYS.NOTIFICATIONS_KEY).then(
            res => {
              return res;
            });
        }));
  }
}
