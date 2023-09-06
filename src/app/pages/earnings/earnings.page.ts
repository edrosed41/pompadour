import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/common/services/loading/loading.service';
import { ToastService } from 'src/app/common/services/toast/toast.service';
import { Router, NavigationExtras } from '@angular/router';

import * as moment from 'moment';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.page.html',
  styleUrls: ['./earnings.page.scss'],
})
export class EarningsPage implements OnInit {
  userEarnings;
  currentMonthEarnings;
  totalEarnings;

  constructor(
    private loadingSvc: LoadingService,
    private toastSvc: ToastService,
    private userSvc: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initEarnings();
  }

  reInitializeEarnings(event) {
    this.initEarnings();
    event.target.complete();
  }

  initEarnings() {
    this.loadingSvc.show();
    this.userSvc.getUserTotalEarnings().subscribe((res) => {
      console.log(res);
      this.userEarnings = res;
      this.processEarnings();
      this.loadingSvc.close();
    }, (err: any) => {
      console.log(err);
      this.toastSvc.showErrorToast('Unable to retrieve user earnings.');
    });
  }

  processEarnings() {
    this.totalEarnings = 0;
    this.userSvc.getUserEarningsByDateRange(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')).subscribe((res) => {
      console.log(res);
      this.totalEarnings = res;
    });
    if (this.userEarnings) {
      let currentEarning = null;
      for (const e of this.userEarnings) {
        // this.totalEarnings = this.totalEarnings + e.sales;
        if (moment().isSame(e.month, 'month')) {
          currentEarning = e;
          break;
        }
      }

      if (!currentEarning) {
        this.currentMonthEarnings = {};
        this.currentMonthEarnings.month = moment().format('MMMM YYYY');
        this.currentMonthEarnings.sales = 0;
        this.currentMonthEarnings.appointments = 0;
      } else {
        this.currentMonthEarnings = currentEarning;
      }
      // console.log(this.currentEarnings);
    }
  }

  getCurrentDate() {
    return moment().format('MMMM, DD YYYY');
  }

  earningDetails(earnings: any) {
    console.log(earnings);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        earningParams: earnings
      }
  };
    // this.router.navigate(['appointments/details'], navigationExtras);
    this.router.navigate(['earnings/monthly-details'], navigationExtras);
  }

  reverseItems(earnings: any) {
    return (earnings) ? earnings.reverse() : [];
  }
}
