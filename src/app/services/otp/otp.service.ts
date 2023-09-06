import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { APIResponse } from 'src/app/common/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(
    private http: HttpClient
  ) { }

  sendOTP(mobileNumber: string): Observable<any> {
    const apiUrl = environment.CONSTANTS.API_URL.OTHERS + 'sendOTP/' + mobileNumber;
    return this.http.post(apiUrl, null).pipe(
      map((result: APIResponse) => {
          // console.log(result);
          return result.resultObject;
        },
        err => {
          console.log(err);
          return err;
        }
      ));
  }

  validateOTP(otp: number): Observable<any> {
    const apiUrl = environment.CONSTANTS.API_URL.OTHERS + 'confirm/' + otp;
    return this.http.post(apiUrl, null).pipe(
      map((result: APIResponse) => {
        // console.log(result);
        return result.resultObject;
      },
      err => {
        console.log(err);
        return err;
      }
    ));
  }
}
