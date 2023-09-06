import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpValidatorPage } from './otp-validator.page';

describe('OtpValidatorPage', () => {
  let component: OtpValidatorPage;
  let fixture: ComponentFixture<OtpValidatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpValidatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpValidatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
