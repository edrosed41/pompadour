import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OTPRequest, OTPResponse, ResponseType } from 'src/app/common/models/otp.model';
import { OtpService } from 'src/app/services/otp/otp.service';
import { ToastService } from 'src/app/common/services/toast/toast.service';

@Component({
  selector: 'app-otp-validator',
  templateUrl: './otp-validator.page.html',
  styleUrls: ['./otp-validator.page.scss'],
})
export class OtpValidatorPage implements OnInit {
  @ViewChild('otpInput1') otpInput1: any;
  otpForm: FormGroup;
  didSubmit = false;
  showErroMessage = false;

  requestParams: OTPRequest;
  responseParms: OTPResponse = new OTPResponse();
  loading = false;

  otpMessage = '';
  showOtpError = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private otpSvc: OtpService,
    private toastSvc: ToastService
  ) { }

  ngOnInit() {
    this.otpForm = this.formBuilder.group({
      otpInput1: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      otpInput2: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      otpInput3: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      otpInput4: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      otpInput5: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]],
      otpInput6: ['', [Validators.required, Validators.pattern('^[0-9]{1}$')]]
    });
  }

  get errorControl() {
    return this.otpForm.controls;
  }

  ionViewDidEnter() {
    this.setFocus();
    this.responseParms.validOTP = false;
  }

  setFocus(currentElement?, nextElement?) {
    if (currentElement && nextElement) {
      if (currentElement.value !== '') {
        nextElement.setFocus();
      }
    } else {
      setTimeout(() => {
        this.otpInput1.setFocus();
      }, 100);
    }
  }

  sendOTP() {
    this.loading = true;
    this.otpSvc.sendOTP(this.requestParams.mobileNumber).subscribe(
      res => {
        this.loading = false;
        // this.toastSvc.showSuccessToast('We have sent you a new code. Please check your messages.');
        this.otpMessage = 'Code has been resent.';
        this.showOtpError = false;
      },
      err => {
        this.showErrorToast('Sorry, we are unable to send code.');
        this.otpMessage = 'Sorry, we are unable to send a code.';
        this.showOtpError = true;
        this.loading = false;
      }
    );
  }

  verify() {
    this.didSubmit = true;
    if (this.otpForm.valid) {
      this.loading = true;
      const inputValues = this.otpForm.value;
      // tslint:disable-next-line: max-line-length
      const codeProvided =  inputValues.otpInput1.toString() + inputValues.otpInput2.toString() + inputValues.otpInput3.toString() + inputValues.otpInput4.toString() + inputValues.otpInput5.toString() + inputValues.otpInput6.toString();

      this.otpSvc.validateOTP(codeProvided).subscribe(
        res => {
          this.loading = false;
          this.responseParms.type = ResponseType.SUCCESS;
          this.responseParms.validOTP = true;
          this.closeModal();
        },
        err => {
          console.log(err);
          // this.showErrorToast('The code you have provided is invalid.');
          this.otpMessage = 'You entered an invalid code. Try again?';
          this.showOtpError = true;

          this.loading = false;
        });



      // if (codeProvided === this.requestParams.otpCode) {
      //   this.loading = false;
      //   this.responseParms.type = ResponseType.SUCCESS;
      //   this.responseParms.validOTP = true;
      //   this.closeModal();
      // } else {
      //     this.otpMessage = 'You entered an invalid code. Try again?';
      //     this.showOtpError = true;
      //     this.loading = false;
      // }
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(this.responseParms);
  }

  showErrorToast(message: string) {
    this.toastSvc.showErrorToast(message);
    // console.log(message);
  }

}
