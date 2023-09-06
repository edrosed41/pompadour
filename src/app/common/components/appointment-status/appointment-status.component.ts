import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AppointmentStatus, AppointmentStatusCode } from 'src/app/common/models/appointment.model';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.scss'],
})
export class AppointmentStatusComponent implements OnInit {
  @Input() bookingStatusCode: AppointmentStatusCode;
  @Input() bookingStatus: AppointmentStatus;
  @Input() eta: any;
  @Output() chatButtonClick =  new EventEmitter<boolean>();
  @Input() isPast: boolean;

  statusCode: typeof AppointmentStatusCode;
  status: typeof AppointmentStatus;
  constructor() { }

  ngOnInit() {
    this.statusCode = AppointmentStatusCode;
    this.status = AppointmentStatus;
  }

  doChat() {
    console.log('chat is not available for now');
    // if (this.bookingStatusCode !== AppointmentStatusCode.PENDING) {
      // this.chatButtonClick.emit(true);
      // console.log('chat allowed');
    // }
    // console.log('chat not allowed');
  }

  isPastAndNotCompleted() {
    return this.isPast && this.bookingStatus !== AppointmentStatus.COMPLETED;
  }

}
