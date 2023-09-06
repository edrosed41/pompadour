import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { APIResponse } from 'src/app/common/models/api-response.model';
import { AuthService } from '../auth/auth.service';
import { Service } from 'src/app/common/models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsAndServicesService {

  constructor(
    private http: HttpClient,
    private authSvc: AuthService
  ) {
  }

  getServiceOfferedById(serviceId: any): Observable<Service> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.PRODUCT_AND_SERVICES + 'serviceoffered/' + serviceId;
    return this.http.get<Service>(url, httpOptions).pipe(
      map((result: any) => {
        // console.log(result);
        const serviceDetails: any = result.resultObject;
        return serviceDetails;
      }, (err: any) => {
        console.log(err);
        return err;
      })
    );
  }

  // getServiceAvailability(providerId: string): Observable<
  getPackageById(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authSvc.getAccessToken()
      })
    };

    const url = environment.CONSTANTS.API_URL.PRODUCT_AND_SERVICES + 'packagecosting/' + id;
    return this.http.get(url, httpOptions).pipe(
      map((result: APIResponse) => {
        // console.log(result);
        return result.resultObject[0];
      }, (err: any) => {
        console.log(err);
        return err;
      })
    );
  }

}
