import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  user = new User();
  constructor(
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSvc.getUserInformationFromStorage().subscribe(
      (userInfo: User) => {
        this.user = userInfo;
      },
      (err: any) => {
        console.log(err);
        this.user.fullName = 'dear service provider';
      });
  }

  signout() {
    this.authSvc.logout().subscribe(() => {
      this.router.navigate(['sign-in']);
    });
  }

  getUserFullName() {
    return this.user.firstName + ' ' + this.user.lastName;
  }
}
