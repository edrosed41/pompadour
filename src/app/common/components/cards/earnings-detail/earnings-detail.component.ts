import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-earnings-detail',
  templateUrl: './earnings-detail.component.html',
  styleUrls: ['./earnings-detail.component.scss'],
})
export class EarningsDetailComponent implements OnInit {
  @Input() earning: any;

  constructor() { }

  ngOnInit() {}

}
