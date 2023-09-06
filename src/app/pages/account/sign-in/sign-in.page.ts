import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { LoadingService  } from 'src/app/common/services/loading/loading.service';

import { AuthService } from 'src/app/services/auth/auth.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from 'src/app/common/models/user.model';
import { environment } from 'src/environments/environment';
import { NetworkCheckService } from 'src/app/common/services/network-check/network-check.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signinForm: FormGroup;
  didSubmit = false;

  errorMessage = '';
  loading = false;
  presentOTPPage = false;
  mobileNumberToVerify = '';

  user = new User();

  accessToken = '';
  refreshToken = '';

  constructor(
    private formBuilder: FormBuilder,
    private userSvc: UserService,
    private loadingSvc: LoadingService,
    private authSvc: AuthService,
    private router: Router,
    private networkStatus: NetworkCheckService
  ) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required]]
    });
  }

  get errorControl() {
    return this.signinForm.controls;
  }

  continue() {
    if (this.networkStatus.networkStatus()) {
      this.didSubmit = true;
      this.errorMessage = '';
      if (this.signinForm.valid) {
        this.loadingSvc.show();
        this.userSvc.signInUser('63' + this.signinForm.value.username, this.signinForm.value.password)
              .subscribe((signInRes: any) => {
                console.log(signInRes);
                const at = signInRes.accessToken;
                const rt = signInRes.resfreshToken;
                forkJoin({
                  accessToken: this.authSvc.storeAccessTokenToLocalStorage(at),
                  refreshToken: this.authSvc.storeRefreshTokenToLocalStorage(rt)
                }).subscribe(
                  (saveTokenRes: any) => {
                    console.log(saveTokenRes);
                    this.userSvc.getUserInfo().subscribe(
                      (userResponse: User) => {
                        console.log(userResponse);

                        // Check if user is indeed roleId 3
                        if (userResponse.roleId === environment.CONSTANTS.USER_ROLE) {
                          // Show OTP Page
                          this.loadingSvc.close();
                          this.user = userResponse;
                          this.accessToken = saveTokenRes.accessToken;
                          this.refreshToken = saveTokenRes.refreshToken;
                          this.presentOTPPage = true;
                        }
                        else {
                          this.authSvc.logout().subscribe(() => {
                            // Show Error;
                            this.loadingSvc.close();
                            this.errorMessage = 'User is not allowed to use Pompadour\'s Barber Application.';
                          });
                        }
                      },
                      (userErr: any) => {
                        console.log(userErr);
                        this.errorMessage = 'Sorry, something went wrong';
                        this.loadingSvc.close();
                      });
                  },
                  (saveTokenErr: any) => {
                    console.log(saveTokenErr);
                    this.errorMessage = 'Sorry, something went wrong';
                    this.loadingSvc.close();
                  }
                );
              }, (err: any) => {
                console.log(err);
                this.errorMessage = 'Username and Password did not match.';
                this.loadingSvc.close();
              });
        }
    } else {
      this.networkStatus.showNetworkStatusError();
    }
  }

  otpModalDidResponse(event: any) {
    console.log(event);
    // this.loading = true;
    this.loadingSvc.show();
    this.presentOTPPage = false;
    if (event.validOTP) {
      this.userSvc.saveUserInformation(this.user).subscribe(
        (saveResponse) => {
          console.log(saveResponse);
          this.loadingSvc.close();
          setTimeout(() => {
            this.authSvc.doLogin(this.accessToken, this.refreshToken);
            this.router.navigate(['tabs/intro']);
          }, 100);
        },
        (saveError) => {
          this.authSvc.logout().subscribe(() => {
            // Show Error;
            this.loadingSvc.close();
            this.errorMessage = saveError.message ? saveError.message : 'Sorry, something went wrong';
          });
        }
      );
    }
    else {
      this.authSvc.logout().subscribe(() => {
        // Show Error;
        setTimeout(() => {
          this.loadingSvc.close();
        }, 100);
      });
    }
  }

  goToSignup() {
    this.router.navigate(['sign-up']);
  }
}
