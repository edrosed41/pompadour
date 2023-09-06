import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, from, forkJoin, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Platform } from '@ionic/angular';
import { UserRegisterParams } from 'src/app/common/models/params.model';
import { APIResponse } from 'src/app/common/models/api-response.model';
import { User } from 'src/app/common/models/user.model';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private authSvc: AuthService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.getUserInformationFromStorage().subscribe(res => {
        // console.log(res);
        this.user = res;
      });
    });
  }

  getUserInformationFromStorage(): Observable<any> {
    return from(this.storage.get(environment.STORAGE_KEYS.USER_INFO_KEY).then((response: User) => {
      return response;
    }));
  }

  storeUserInformationToLocalStorage(userInformation: any): Observable<any> {
    return from(this.storage.set(environment.STORAGE_KEYS.USER_INFO_KEY, userInformation).then(response => {
      return response;
    }));
  }

  saveUserInformation(userInformation: any): Observable<any> {
    return from(this.storeUserInformationToLocalStorage(userInformation).pipe(
      map(
        res => {
          // console.log('save user information');
          // console.log(res);
          this.user = res;
          return res;
        },
        err => {
          console.log(err);
          return(err);
        }
      )
    ));
  }

  saveRegistrationToken(regToken: string, uuid: string): Observable<any> {
      const url = environment.CONSTANTS.API_URL.ACCOUNT + 'device';

      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authSvc.getAccessToken()
        })
      };

      const data = [{
        registrationToken: regToken,
        deviceId: uuid,
        userId: this.user.userId
      }];

      // console.log(this.user);
      // console.log(data);
      return this.http.post(url, data, httpOptions).pipe(
        map((res: any) =>  {
          return res.resultObject;
        },
        err => {
          console.log(err);
          return err;
        })
      );
  }

  signInUser(username: string, pass: string): Observable<any> {
    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'login';
    const data = {
      mobileNumber: username,
      password: pass
    };

    return this.http.post(url, data).pipe(
      map((res: any) =>  {
        return res.resultObject;
      },
      err => {
        console.log(err);
        return err;
      })
    );
  }

  getUserInfo(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'userinfo';
    return this.http.get(url, httpOptions).pipe(
        map((result: any) =>  {
          if (result.resultObject.length === 0) {
            return throwError(result);
          }
          this.user = result.resultObject[0];
          return this.user;
        },
        err => {
            console.log(err);
            return err;
        }));
  }

  registerUser(registrationParams: UserRegisterParams): Observable<any> {
    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'register';

    console.log(registrationParams);

    return this.http.post(url, registrationParams).pipe(
        map((results: APIResponse) => {
          // console.log(results);
          return results.resultObject;
        },
        err => {
          console.log(err);
          return err;
        }));
  }

  getUserRegistrationToken(userId: any): Observable<any> {
    console.log('Get Registration Token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };
    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'device/' + userId;
    return this.http.get(url, httpOptions).pipe(
      map((result: any) =>  {
        if (result.resultObject.length === 0) {
          return '';
        }
        // this.user = result.resultObject[0];
        // console.log('Get Registration Response');
        // console.log(result.resultObject);
        return result.resultObject[0];
      },
      err => {
          console.log(err);
          return err;
      }));
  }

  getUserRating(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };
    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'provideraverageratings/' + this.user.userId;
    return this.http.get(url, httpOptions).pipe(
      map((result: any) =>  {
        this.user.rating = result.resultObject;
        return result.resultObject;
      },
      err => {
          console.log(err);
          return err;
      }));
  }

  getUserRatingList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };
    const url = environment.CONSTANTS.API_URL.ACCOUNT + 'providerratings/2/' + this.user.userId;
    return this.http.get(url, httpOptions).pipe(
      map((result: any) =>  {
        // this.user.rating = result.resultObject;
        return result.resultObject;
      },
      err => {
          console.log(err);
          return err;
      }));
  }

  getUserTotalEarnings(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.BOOKINGS + 'booking/earnings/' + this.user.userId + '/completed';
    return this.http.get(url, httpOptions).pipe(
      map((result: any) =>  {
        // this.user.rating = result.resultObject;
        // this.user.totalEarnings = result.resultObject;
        return result.resultObject;
      },
      err => {
          console.log(err);
          return err;
      }));
  }

  getUserEarningsByDateRange(fromDate: any, toDate: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.BOOKINGS + 'booking/earnings/' + this.user.userId + '/' + fromDate + '/' + toDate + '/1';
    return this.http.get(url, httpOptions).pipe(
      map((result: any) =>  {
        // this.user.rating = result.resultObject;
        // this.user.totalEarnings = result.resultObject;
        return result.resultObject;
      },
      err => {
          console.log(err);
          return err;
      }));
  }

  getUserEarningsWithLimit(take, skip): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.BOOKINGS + 'booking/earnings/' + this.user.userId + '/' + take + '/' + skip;
    return this.http.get(url, httpOptions).pipe(
      map((result: any) =>  {
        // this.user.rating = result.resultObject;
        // this.user.totalEarnings = result.resultObject;
        return result.resultObject;
      },
      err => {
          console.log(err);
          return err;
      }));
  }

  userInformation() {
    return this.user;
  }
}
