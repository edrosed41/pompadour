import { Component, OnInit } from '@angular/core';
import { AccountStatus } from 'src/app/common/models/account.model';
import { User } from 'src/app/common/models/user.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
declare const google;

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  user: User;
  registrationToken: any;
  geoCoder: any;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private localNotification: LocalNotifications,
  ) { }

  ngOnInit() {
    this.user = this.userSvc.userInformation();
  }

  ionViewDidEnter() {
    if (this.user?.accountStatus === AccountStatus.APPROVED) {
      // console.log('navigate to main page');
      this.navigateToMainPage();
    } else {
      // console.log('navigate to confirmation page');
      setTimeout(() => {
        // console.log('navigate to confirmation page');
        this.router.navigate(['account-confirmation']);
      }, 50);
    }
  }

  navigateToMainPage() {
    this.localNotification.hasPermission().then((allowed: boolean) => {
      console.log('local notif permission:' + allowed);
      if (allowed) {
            this.router.navigate(['tabs/main']);
      } else {
        this.localNotification.requestPermission().then((granted) => {
            this.router.navigate(['tabs/main']);
        }, (err: any) => {
            this.router.navigate(['tabs/main']);
        });
      }
    },
    (err: any) => {
        this.router.navigate(['tabs/main']);
    });
  }

}
