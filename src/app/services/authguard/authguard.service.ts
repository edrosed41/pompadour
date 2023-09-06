import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate  {

  constructor(
    private authSvc: AuthService
  ) { }

  canActivate(): boolean {
    return this.authSvc.isAuthenticated();
    // return false;
  }
}
