import { Injectable } from '@angular/core';
import { Trend } from './trend';
import { TRENDS } from './trend.mock';

@Injectable({
	providedIn: 'root'
})
export class TrendService {

	constructor() { }
	
	getTrends(): Promise<Trend[]> {
		return Promise.resolve(TRENDS);
	}
}