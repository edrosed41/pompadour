import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EarningsPage } from './earnings.page';

describe('EarningsPage', () => {
  let component: EarningsPage;
  let fixture: ComponentFixture<EarningsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EarningsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
