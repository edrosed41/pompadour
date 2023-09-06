import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../../models/service.model';


@Component({
  selector: 'app-appointment-summary',
  templateUrl: './appointment-summary.component.html',
  styleUrls: ['./appointment-summary.component.scss'],
})
export class AppointmentSummaryComponent implements OnInit {
  @Input() service: Service;
  @Input() totalFee: number;
  constructor() { }

  ngOnInit() {}

}
