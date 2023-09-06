import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/common/services/loading/loading.service';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { UserService } from 'src/app/services/user/user.service';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  registrationToken;
  constructor(
    private loadingSvc: LoadingService,
    private fcm: FCM,
    private userSvc: UserService,
    private platform: Platform,
    private device: Device
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // this.saveRegistrationToken();
  }

  // saveRegistrationToken() {
  //   this.platform.ready().then(
  //     () => {
  //       console.log(!this.platform.is('mobileweb'));
  //       if (!this.platform.is('mobileweb')) {
  //         this.loadingSvc.show();
  //         this.fcm.getToken().then((tokenRes: any) => {
  //           console.log(tokenRes);
  //           this.registrationToken = tokenRes;
  //           this.userSvc.saveRegistrationToken(tokenRes, this.device.uuid).subscribe(
  //             (regRes) => {
  //               console.log(regRes);
  //               this.loadingSvc.close();
  //             },
  //             (regErr) => {
  //               console.log(regErr);
  //               this.loadingSvc.close();
  //             }
  //           );
  //         }).catch((errRes: any) => {
  //           console.log(errRes);
  //           this.loadingSvc.close();
  //         });
  //       }
  //   });
  // }
}
