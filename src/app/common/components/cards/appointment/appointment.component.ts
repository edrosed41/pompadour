import { Component, Input, OnInit } from '@angular/core';
import { AppointmentCard } from 'src/app/common/models/appointment-card.model';
import { Booking } from 'src/app/common/models/booking.model';
import { Notification } from 'src/app/common/models/notification.model';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  @Input() appointment: AppointmentCard;
  @Input() ongoing: boolean;
  @Input() past: boolean;
  serviceIcon = 'assets/icons/service-cut.svg';

  constructor() { }

  ngOnInit() {
  }

}
