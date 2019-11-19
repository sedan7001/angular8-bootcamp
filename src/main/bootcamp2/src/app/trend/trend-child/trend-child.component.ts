import { Component, OnInit, Input } from '@angular/core';
import { Trend } from '../../service/trend';

@Component({
  selector: 'app-trend-child',
  templateUrl: './trend-child.component.html',
  styleUrls: ['./trend-child.component.less']
})
export class TrendChildComponent implements OnInit {

	@Input() childTrends: Trend[];
	
  constructor() { }

  ngOnInit() {
  }

}
