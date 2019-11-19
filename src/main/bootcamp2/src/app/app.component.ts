import { Component, NgZone, ViewChild } from '@angular/core';
import { QueryService, SubscribeTypes } from 'eediom-sdk';
import { GridData, QueryResult, ChartComponent, ChartTypes, LineChartConfigs, Field, Chart } from 'eediom-sdk';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})
export class AppComponent {
	@ViewChild('chart', { static: true }) chartComponent: ChartComponent;
	title: string = 'BOOTCAMP 2019';
	link: string = 'LOGPRESSO';
	gridData: GridData;
	fieldTypes: QueryResult["fieldTypes"];
	records: QueryResult["records"];
	count: QueryResult["count"];
	chart: Chart;
	query: string = '';
	loading: boolean = false;
	querySuccess: boolean = false;
	isOpen: boolean = false;


	constructor(private queryService: QueryService, private ngZone: NgZone) {
	}

	ngOnInit() {
		this.chart = new Chart(ChartTypes.Area, new LineChartConfigs(
			new Field('_time', 'date', '날짜'),
			[
				new Field('Unreal.js', 'int'),
				new Field('billboard.js', 'int'),
				new Field('iotjs', 'int'),
				new Field('metatron-discovery', 'int'),
				new Field('tui.editor', 'int'),
				new Field('veles', 'int'),
			],
			false
		));
		this.chartComponent.render(null, this.chart);
	}

	executeQuery() {
		this.querySuccess = false;
		this.loading = true;
		this.queryService.query(this.query, (queryId, subscribeData) => {
			if (subscribeData.type === SubscribeTypes.Eof) {
				this.queryService.getResult(queryId, 100, 0).then((queryResult) => {
					this.ngZone.run(() => {
						this.fieldTypes = queryResult.fieldTypes;
						this.count = queryResult.count;
						this.records = queryResult.records;
						this.onRender();
					})
				})
			}
		});
	}

	columnFiltering(columns) {
		const tmp = columns.filter((key) => {
			return key.column !== '_id' && key.column !== '_time' && key.column !== '_table';
		}).map((key) => {
			return new Field(key.column, key.type);
		});
		return tmp;
	}

	onRender(): void {
		setTimeout(() => {
			const filteredColumns = this.columnFiltering(this.fieldTypes);
			this.chart = new Chart(
				ChartTypes.Area, 
				new LineChartConfigs(new Field('_time', 'date', '날짜'), filteredColumns, false)
				);

			this.loading = false;
			this.querySuccess = true;
			this.isOpen = true;
			this.chartComponent.update(this.chart, this.records);
			this.gridData = new GridData({
				records: this.records
			})
		}, 1000)
	}

}