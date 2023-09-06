import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-appointment-payment-method',
  templateUrl: './appointment-payment-method.component.html',
  styleUrls: ['./appointment-payment-method.component.scss'],
})
export class AppointmentPaymentMethodComponent implements OnInit {
  @Input() totalFee: number;
  @Input() allowChangePaymentMethod: boolean;

  @Output() changePaymentMethod = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  changePayment() {
    this.changePaymentMethod.emit(true);
  }

}
