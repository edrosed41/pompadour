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

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private authSvc: AuthService,
    private http: HttpClient,
    private platform: Platform,
    private storage: Storage
  ) { }

  getAllBookings(userId: any): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authSvc.getAccessToken()
        })
      };

      const url = environment.CONSTANTS.API_URL.BOOKINGS + 'booking/serviceproviders/0/' + userId + '/0/0';
      return this.http.get(url, httpOptions).pipe(map((res: APIResponse) =>  {
          return res.resultObject;
        },
        err => {
          console.log(err);
          return err;
        })
      );
  }

  getBookingById(bookingId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.BOOKINGS + 'booking/' + bookingId;
    return this.http.get(url, httpOptions).pipe(map((res: APIResponse) =>  {
        if (res.resultObject.length > 0) {
          return res.resultObject[0];
        } else {
          return {};
        }
      },
      err => {
        console.log(err);
        return err;
      })
    );
}

  // https://pompadour-svc-bookings-stg.azurewebsites.net/api/v1/booking/9fb0e4b2-6aff-40e4-b8d3-db3cbe22e406-771665-1930


  updateBookingStatus(id: any, status: AppointmentStatus, statuscode: AppointmentStatusCode, remark: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const params = {
      bookingId: id,
      statusId: statuscode,
      statusDescription: status,
      remarks: remark
    };
    const url = environment.CONSTANTS.API_URL.BOOKINGS + 'bookingstatus';
    return this.http.post(url, [params], httpOptions).pipe(map((res: APIResponse) =>  {
          return res.resultObject;
        },
        err => {
          console.log(err);
          return err;
        })
      );

  }

  addProviderBookingLocation(id: any, lat: any, lng: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const params = {
      bookingId: id,
      longitude: lng.toString(),
      latitude: lat.toString()
    };

    const url = environment.CONSTANTS.API_URL.BOOKINGS + 'providerloc';
    return this.http.post(url, [params], httpOptions).pipe(map((res: APIResponse) =>  {
      return res.resultObject;
    },
    err => {
      console.log(err);
      return err;
    })
  );
  }

  rateBooking(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'clientrating';
    return this.http.post(url, [params], httpOptions).pipe(map((res: APIResponse) =>  {
      return res.resultObject;
    },
    err => {
        console.log(err);
        return err;
      })
    );
  }

  getRatingByBookingId(id: string): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'clientrating/1/' + id;
    return this.http.get(url, httpOptions).pipe(map((res: APIResponse) =>  {
      // console.log(res);
      return res.resultObject;
    },
    err => {
        console.log(err);
        return err;
      })
    );
  }

  storeAppointmentsToLocalStorage(appointments): Observable<any> {
    return from(
      this.platform.ready().then(() => {
        return this.storage.set(environment.STORAGE_KEYS.BOOKING_STORAGE_KEY, appointments).then(
          res => {
            return appointments;
          });
      }));
  }

  getAppointmentsFromLocalStorage(): Observable<Appointment[]> {
    return from(
      this.platform.ready().then(
        () => {
          return this.storage.get(environment.STORAGE_KEYS.BOOKING_STORAGE_KEY).then(
            res => {
              return res;
            });
        }));
  }

}
