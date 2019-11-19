import { Component, OnInit } from '@angular/core';
import { TrendService } from '../service/trend.service';
import { Trend } from '../service/trend';

@Component({
	selector: 'app-trend',
	templateUrl: './trend.component.html',
	styleUrls: ['./trend.component.less']
})
export class TrendComponent implements OnInit {

	parentTrends:Trend[];
	
	constructor(private trendService: TrendService) { }

	ngOnInit(): void {
		this.getTrends();
	}

	getTrends(): void {
		this.trendService.getTrends().then(data => this.parentTrends = data);
	}
}
