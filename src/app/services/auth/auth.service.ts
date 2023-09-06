import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, from, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(null);
  accessToken = new BehaviorSubject(null);
  refreshToken = new BehaviorSubject(null);
  registrationToken = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.checkLogin();
    });
  }

  checkLogin() {
    const isAccessAndRefreshTokenAvailable = forkJoin({
      accesToken: this.getAccessTokenFromLocalStorage().pipe(
        map( res => {
          return res;
        })),
      refreshToken: this.getRefreshTokenFromLocalStorage().pipe(
        map( res => {
          return res;
        })
      )
    });

    isAccessAndRefreshTokenAvailable.subscribe( result => {
      if (result.accesToken && result.refreshToken) {
        this.accessToken.next(result.accesToken);
        this.refreshToken.next(result.refreshToken);
        this.authState.next(true);
      }
    });
  }

  doLogin(accessToken: string, refreshToken: string) {
    if (accessToken && refreshToken) {
      this.accessToken.next(accessToken);
      this.refreshToken.next(refreshToken);
      this.authState.next(true);
    }
  }

  logout(): Observable<boolean> {
    return from(this.storage.clear().then(() => {
      this.authState.next(false);
      return true;
    }));
  }

  getAccessTokenFromLocalStorage(): Observable<any> {
    return from(this.storage.get(environment.STORAGE_KEYS.ACCESS_TOKEN_KEY).then(
      response => {
        return response;
      }
    ));
  }

  getRefreshTokenFromLocalStorage(): Observable<any> {
    return from(this.storage.get(environment.STORAGE_KEYS.REFRESH_TOKEN_KEY).then(
      response => {
        return response;
      }
    ));
  }

  storeAccessTokenToLocalStorage(accessToken: string): Observable<any> {
    return from(this.storage.set(environment.STORAGE_KEYS.ACCESS_TOKEN_KEY, accessToken).then(
      response => {
        this.accessToken.next(accessToken);
        return response;
      }
    ));
  }

  storeRefreshTokenToLocalStorage(refreshToken: string): Observable<any> {
    return from(this.storage.set(environment.STORAGE_KEYS.REFRESH_TOKEN_KEY, refreshToken).then(
      response => {
        this.refreshToken.next(refreshToken);
        return response;
      }
    ));
  }

  getAccessToken() {
    return this.accessToken.value;
  }

  getRefreshToken() {
    return this.refreshToken.value;
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
