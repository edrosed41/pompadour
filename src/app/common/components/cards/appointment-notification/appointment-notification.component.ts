import { Component, Input, OnInit } from '@angular/core';
import { Booking } from 'src/app/common/models/booking.model';
import { Notification, NotificationStatus } from 'src/app/common/models/notification.model';

@Component({
  selector: 'app-appointment-notification-card',
  templateUrl: './appointment-notification.component.html',
  styleUrls: ['./appointment-notification.component.scss'],
})
export class AppointmentNotificationComponent implements OnInit {
  @Input() notification: Notification;

  notificationStatus: typeof NotificationStatus;
  constructor() { }

  ngOnInit() {
    // console.log('Booking card was intialized');
    // console.log(this.notification);
    this.notificationStatus = NotificationStatus;
  }

}
