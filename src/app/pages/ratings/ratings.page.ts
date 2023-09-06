import { Component, OnInit } from '@angular/core';

import { LoadingService} from 'src/app/common/services/loading/loading.service';
import { ToastService} from 'src/app/common/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
})
export class RatingsPage implements OnInit {
  userRatings = new Array<any>();
  constructor(
    private laodingSvc: LoadingService,
    private toastService: ToastService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.initUserRatings();
  }

  reInitializeEarnings(event) {
    this.initUserRatings();
    event.target.complete();
  }

  initUserRatings() {
    this.laodingSvc.show();
    this.userSvc.getUserRatingList().subscribe((res: any) => {
      // console.log(res);
      this.userRatings = res;
      this.userRatings.reverse();
      this.laodingSvc.close();
    }, (err: any) => {
      console.log(err);
      this.laodingSvc.close();
      this.toastService.showErrorToast('Unable to fetch user ratings.');
    });
  }
}
