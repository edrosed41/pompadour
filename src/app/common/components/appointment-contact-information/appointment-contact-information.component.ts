import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingCustomerAccount } from '../../models/bookiing-customer-account.model';

@Component({
  selector: 'app-appointment-contact-information',
  templateUrl: './appointment-contact-information.component.html',
  styleUrls: ['./appointment-contact-information.component.scss'],
})
export class AppointmentContactInformationComponent implements OnInit {
  @Input() enableInputFields: boolean;
  @Input() contactInfomation: BookingCustomerAccount;

  @Output() newaddressDetail: any = new EventEmitter<any>();
  @Output() newNotes: any = new EventEmitter<any>();

  addressDetail: any; // this is not changeable
  notes: any;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.addressDetail = this.contactInfomation.addressDetail || '';
    this.notes = this.contactInfomation.notes || '';
  }

  addressDetailChanged() {
    this.newaddressDetail.emit(this.addressDetail);
  }

  notesChanged() {
    this.newNotes.emit(this.notes);
  }

}
