import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/common/models/user.model';

import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user/user.service';
import { NetworkCheckService } from 'src/app/common/services/network-check/network-check.service';

@Component({
  selector: 'app-main-card',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() user: User;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private networkStatusSvc: NetworkCheckService
  ) { }

  ngOnInit() {
    // console.log('init');
  }

  goToProfile() {
    this.router.navigate(['tabs/profile']);
  }

  goToEarnings() {
    // console.log('navigate to earnings');
    if (this.networkStatusSvc.networkStatus()) {
      this.router.navigate(['/earnings']);
    } else {
      this.networkStatusSvc.showNetworkStatusError();
    }
  }

  goToRatings() {
    if (this.networkStatusSvc.networkStatus()) {
      this.router.navigate(['/ratings']);
    } else {
      this.networkStatusSvc.showNetworkStatusError();
    }
  }
}
