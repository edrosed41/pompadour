import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { User } from './common/models/user.model';
import { AccountStatus } from './common/models/account.model';
import { ToastService } from './common/services/toast/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: User;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authSvc: AuthService,
    private userSvc: UserService,
    private fcm: FCM,
    private menuCtrl: MenuController,
    private toastSvc: ToastService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authSvc.getAccessTokenFromLocalStorage().subscribe((accessToken: any) => {
          if (accessToken !== '' && accessToken !== null) {
            // console.log('access token is available');
            this.router.navigate(['tabs/intro']);
          } else {
            this.router.navigate(['sign-in']);
          }
        },
        (err: any) => {
          console.log('error fetching access token is available');
          this.router.navigate(['sign-in']);
        });

      console.log(!this.platform.is('mobileweb'));
      if (!this.platform.is('mobileweb')) {
        // subscribe to a topic
        // this.fcm.subscribeToTopic('Deals');

        // get FCM token
        this.fcm.getToken().then(token => {
          // console.log(token);
        });

        // ionic push notification example
        this.fcm.onNotification().subscribe(data => {
          console.log(data);
          this.toastSvc.showSuccessToast('There is an update to you booking(s).');
          if (data.wasTapped) {
            // alert(JSON.stringify(data));
            console.log('Received in background');
          } else {
            console.log('');
            // alert(JSON.stringify(data));
            console.log('Received in foreground');
          }
        });

        // refresh the FCM token
        this.fcm.onTokenRefresh().subscribe(token => {
          console.log(token);
        });

        // unsubscribe from a topic
        // this.fcm.unsubscribeFromTopic('offers');
      }

    });
  }

  closeMenu() {
    setTimeout(() => {
      this.menuCtrl.close();
    }, 100);
  }

  logout() {
    this.menuCtrl.close();
    this.authSvc.logout().subscribe(
      res => {
        this.router.navigate(['sign-in']);
      });
  }

  goToAccount() {
    this.menuCtrl.close();
    this.router.navigate(['/tabs/profile']);
  }

  goToHelpCenter() {
    this.menuCtrl.close();
    this.router.navigate(['help-center']);
  }

  goToPrivacyPolicy() {
    this.menuCtrl.close();
    this.router.navigate(['privacy-policy']);
  }
}
