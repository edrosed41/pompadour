import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthly-earnings',
  templateUrl: './monthly-earnings.component.html',
  styleUrls: ['./monthly-earnings.component.scss'],
})
export class MonthlyEarningsComponent implements OnInit {
  @Input() earnings: any;

  constructor() { }

  ngOnInit() {}

}
