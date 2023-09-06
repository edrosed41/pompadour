import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingService } from 'src/app/common/services/loading/loading.service';

import * as moment from 'moment';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-monthly-details',
  templateUrl: './monthly-details.page.html',
  styleUrls: ['./monthly-details.page.scss'],
})
export class MonthlyDetailsPage implements OnInit {
  earningParams;
  monthlyEarning = new Array<any>();

  constructor(
    private router: Router,
    private userSvc: UserService,
    private loadingSvc: LoadingService
  ) { }

  ngOnInit() {
    this.earningParams = this.router.getCurrentNavigation().extras.queryParams?.earningParams;
    this.initEarnings();
  }

  initEarnings() {
    this.loadingSvc.show();
    this.monthlyEarning = new Array<any>();
    this.userSvc.getUserEarningsWithLimit(1000, 0).subscribe((res: any) => {
      // console.log(res);
      if (res) {
        for (const r of res) {
          if (moment(r.date).isSame(this.earningParams.month, 'month')) {
            this.monthlyEarning.push(r);
          }
        }

        console.log(this.monthlyEarning);
      }
      this.loadingSvc.close();
    }, (err: any) => {
      console.log(err);
      this.loadingSvc.close();
    });
  }


}
