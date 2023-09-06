import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MustMatch } from 'src/app/common/helpers/must-match.helper';
import { UserRegisterParams } from 'src/app/common/models/params.model';
import { environment } from 'src/environments/environment';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { ToastService } from 'src/app/common/services/toast/toast.service';
import { LoadingService } from 'src/app/common/services/loading/loading.service';
import { User } from 'src/app/common/models/user.model';
import { NetworkCheckService } from 'src/app/common/services/network-check/network-check.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm: FormGroup;
  didSubmit = false;
  presentOTPPage = false;
  mobileNumberToRegister = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private authSvc: AuthService,
    private toastSvc: ToastService,
    private loadingSvc: LoadingService,
    private networkStatusSvc: NetworkCheckService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]],
      // tslint:disable-next-line: max-line-length
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get errorControl() {
    return this.registerForm.controls;
  }

  gotoLogin() {
    this.router.navigate(['sign-in']);
  }

  register() {
    if (this.networkStatusSvc.networkStatus()) {
      this.didSubmit = true;
      if (this.registerForm.valid) {
        // Send OTP First to validate phone number used

        this.mobileNumberToRegister = '63' + this.registerForm.value.mobileNumber;
        this.presentOTPPage = true;
      }
    }
    else {
      this.networkStatusSvc.showNetworkStatusError();
    }
  }

  otpModalDidResponse(event: any) {
    console.log(event);
    // this.loading = true;
    this.loadingSvc.show();
    this.presentOTPPage = false;
    if (event.validOTP) {
      const registrationParams = new UserRegisterParams();
      registrationParams.firstName = this.registerForm.value.firstname;
      registrationParams.lastName = this.registerForm.value.lastname;
      registrationParams.emailAddress = this.registerForm.value.email;
      registrationParams.mobileNumber = '63' + this.registerForm.value.mobileNumber;
      registrationParams.userName = this.registerForm.value.username;
      registrationParams.password = this.registerForm.value.password;
      registrationParams.roleId = environment.CONSTANTS.USER_ROLE;

      this.userSvc.registerUser(registrationParams).subscribe(
        (regRes: any) => {
          console.log(regRes);
          // this.loadingSvc.show();
          forkJoin({
            accessToken: this.authSvc.storeAccessTokenToLocalStorage(regRes.accessToken),
            refreshToken: this.authSvc.storeRefreshTokenToLocalStorage(regRes.resfreshToken)
          }).subscribe(
              forkRes => {
                // this.loadingSvc.close();
                this.userSvc.getUserInfo().subscribe(
                  (userInfo: any) => {
                    if (userInfo && !userInfo.userId ) {
                      userInfo = registrationParams;
                    }
                    this.userSvc.saveUserInformation(userInfo).subscribe(
                      saveRes => {
                        setTimeout(() => {
                          this.loadingSvc.close();
                          this.authSvc.doLogin(forkRes.accessToken, forkRes.refreshToken);
                          this.router.navigate(['tabs/intro']);
                        }, 100);
                      },
                      (saveErr: any) => {
                        console.log(saveErr);
                        this.loadingSvc.close();
                        this.authSvc.logout().subscribe(() => {
                          this.toastSvc.showErrorToast('Sorry, something went wrong');
                        });
                    });
                  },
                  (userInfoErr: any) => {
                    console.log(userInfoErr);
                    this.loadingSvc.close();
                    this.authSvc.logout().subscribe(() => {
                      this.toastSvc.showErrorToast('Sorry, something went wrong');
                    });
                  });
              },
              (forkerr: any) => {
                  console.log(forkerr);
                  this.loadingSvc.close();
                  this.authSvc.logout().subscribe(() => {
                    this.toastSvc.showErrorToast('Sorry, something went wrong');
                  });
              });
          },
          regErr => {
            console.log(regErr);
            this.loadingSvc.close();
            this.toastSvc.showErrorToast(regErr.error.resultMessage);
      });
    } else {
      console.log('invalid otp');
      setTimeout(() => {
        this.loadingSvc.close();
      }, 100);
    }

  }

}
