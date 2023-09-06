import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OtpValidatorPage } from 'src/app/pages/modals/otp-validator/otp-validator.page';
import { OTPRequest, OTPResponse, ResponseType } from '../../models/otp.model';

import { OtpService } from 'src/app/services/otp/otp.service';

@Component({
  selector: 'app-otp-handler',
  templateUrl: './otp-handler.component.html',
  styleUrls: ['./otp-handler.component.scss'],
})

export class OtpHandlerComponent implements OnInit {
  @Input() otpMobileNumber: string;
  @Output() componentResponse = new EventEmitter<OTPResponse>();

  modalResponse: OTPResponse = new OTPResponse();
  modalProps: OTPRequest = new OTPRequest();
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private otpSvc: OtpService
  ) { }

  ngOnInit() {
    this.initOTP();
  }

  initOTP() {
    /** send OTP Code */
    this.loading = true;

    // this.modalProps.mobileNumber = this.otpMobileNumber;
    // this.modalProps.otpCode = '123450';
    // this.loading = false;
    // this.presentModal();

    this.otpSvc.sendOTP(this.otpMobileNumber).subscribe(
      (res: any) => {
        console.log(res);
        this.modalProps.mobileNumber = this.otpMobileNumber;
        this.modalProps.otpCode = res;
        this.loading = false;
        this.presentModal();
      },
      (err: any) => {
        // console.log(err);
        // this.modalProps.mobileNumber = this.otpMobileNumber;
        // this.modalProps.otpCode = '123450';
        // this.loading = false;
        // this.presentModal();
        this.modalResponse.type = ResponseType.ERROR;
        this.modalResponse.message = 'Sorry, we are unable to send you an OTP.';
        this.modalResponse.validOTP = false;
        this.loading = false;
        this.componentResponse.emit(this.modalResponse);
      });

  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: OtpValidatorPage,
      componentProps: { requestParams: this.modalProps },
      cssClass: 'otp-validato-modal'
    });

    modal.onDidDismiss().then((response: any) => {
      this.modalResponse.type = ResponseType.SUCCESS;
      this.modalResponse.validOTP = response.data.validOTP;
      this.modalResponse.message = response.data.message;

      this.componentResponse.emit(this.modalResponse);
    });
    modal.present();
  }

}
