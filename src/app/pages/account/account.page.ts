import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { LoadingService } from 'src/app/common/services/loading/loading.service';

import { NetworkCheckService } from 'src/app/common/services/network-check/network-check.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  user: User;
  constructor(
    private userSvc: UserService,
    private loadingSvc: LoadingService,
    private networkStatusSvc: NetworkCheckService
  ) { }

  ngOnInit() {
    // this.loadUserLatestInfo();
  }

  ionViewDidEnter() {
    this.loadUserLatestInfo();
  }

  loadUserLatestInfo() {
    if (this.networkStatusSvc.networkStatus()) {
      this.loadingSvc.show();
      this.userSvc.getUserInfo().subscribe((userInfo: User) => {
          this.userSvc.storeUserInformationToLocalStorage(userInfo);
          this.user = userInfo;
          this.userSvc.getUserRating().subscribe((userRating: any) => {
            // console.log(this.user );
            this.user.rating = userRating;
            this.loadingSvc.close();
          }, (userRatingErr: any) => {
            console.log(userRatingErr);
            this.loadingSvc.close();
          });
        },
        (err: any) => {
          console.log(err);
          this.loadingSvc.close();
        }
      );
    } else {
      this.userSvc.getUserInformationFromStorage().subscribe((info: any) => {
        this.user = info;
      });
    }
  }

}
