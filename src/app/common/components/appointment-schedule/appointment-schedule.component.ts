import { Component, OnInit, Input, OnChanges } from '@angular/core';

import * as moment from 'moment';
@Component({
  selector: 'app-appointment-schedule',
  templateUrl: './appointment-schedule.component.html',
  styleUrls: ['./appointment-schedule.component.scss'],
})
export class AppointmentScheduleComponent implements OnInit, OnChanges {

  @Input() bookingDateTime: string;
  bookingDate;
  bookingTime;
  constructor() { }

  ngOnInit() {
    // console.log('APPOINTMENTDETAILS BOOKING SCHEDULE:  ' +  this.bookingDateTime);
    this.bookingDate = moment(this.bookingDateTime).format('MMMM DD, YYYY');
    this.bookingTime = moment(this.bookingDateTime).format('hh:mm A');
  }

  ngOnChanges(changes: any) {
    // console.log(changes);
    this.bookingDate = moment(this.bookingDateTime).format('MMMM DD, YYYY');
    this.bookingTime = moment(this.bookingDateTime).format('hh:mm A');
  }
}
