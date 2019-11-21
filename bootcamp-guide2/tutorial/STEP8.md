- template에 바인드 했던 `onSearch` 구현

```typescript
// metatron-dashboard.component.ts
import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
	QueryResult,
	GridData,
	ColumnTypes,
	Chart,
	ChartTypes,
	BarChartConfigs,
	Field,
	QueryBuilder,
	QueryService,
	SubscribeTypes
} from 'eediom-sdk';
import { dummy } from './dummy';

@Component({
	selector: 'app-metatron-dashboard',
	templateUrl: './metatron-dashboard.component.html',
	styleUrls: [ './metatron-dashboard.component.less' ]
})
export class MetatronDashboardComponent implements OnInit {
	query: string = 'table metatron_user | rename date as _time   | fields repo_full_name, _time, login, type  | eval meta = if(repo_full_name == "metatron-app/metatron-discovery", 1, 0), type= if(repo_full_name == "metatron-app/metatron-discovery", type, null) | stats sum(meta) as meta, count, values(type) as type, min(_time)  as _time, values(repo_full_name) as repos by login | lookup contributors login output value as 사용자종류';
	queryBuilder: QueryBuilder;
	queryId: number;

	tiles: Tile[] = [
		{ title: '필터', col: 5, row: 2, type: TileTypes.Filter },
		{
			title: '그리드',
			col: 3,
			row: 5,
			type: TileTypes.Grid
		},
		{ title: '차트', col: 2, row: 5, type: TileTypes.Chart }
	];

	queryResult: QueryResult;
	gridData: GridData;
	columns: ColumnTypes[];
	records: any[];
	chart: Chart;

	count: number;
	currentPage: number = 1;
	pageSize: number = 100;
	constructor(private queryService: QueryService, private ngZone: NgZone) {
		this.queryBuilder = new QueryBuilder(this.query);
	}

	ngOnInit() {
		this.chart = new Chart(
			ChartTypes.Bar,
			new BarChartConfigs(new Field('login', 'string'), [ new Field('count', 'long') ], false)
		);

		if (!environment.production) {
			this.queryResult = new QueryResult();
			this.queryResult.fieldTypes = QueryResult.parseFieldTypes(dummy.field_types);
			this.queryResult.count = dummy.count;
			setTimeout(() => {
				this.queryResult.records = dummy.result;
				this.gridData = new GridData({
					records: this.queryResult.records
				});
				this.columns = this.queryResult.fieldTypes;
				this.records = dummy.result;
				this.count = dummy.count;
			}, 2000);
		} else {
			this.queryService.query(this.query, (queryId, SubscribeData) => {
				if (SubscribeData.type === SubscribeTypes.Eof) {
					this.ngZone.run(() => {
						this.queryId = queryId;
						this.updateQueryResult();
					});
				}
			});
		}
	}

	onSearch(queryBuilder: QueryBuilder): void {
		this.queryService.query(queryBuilder.filteredQuery, (queryId, subscribeData) => {
			if (subscribeData.type === SubscribeTypes.Eof) {
				this.ngZone.run(() => {
					this.queryId = queryId;
					this.updateQueryResult();
				});
			}
		});
	}

	onPage(page: number): void {
		this.currentPage = page;
		this.updateQueryResult();
	}

	private init(): void {
		this.gridData = new GridData({
			records: []
		});
		this.currentPage = 1;
		this.count = 0;
		this.records = [];
	}

	private async updateQueryResult(): Promise<void> {
		this.queryResult = await this.queryService.getResult(
			this.queryId,
			this.pageSize,
			this.pageSize * (this.currentPage - 1)
		);

		if ((this.queryResult.records || []).length === 0) {
			this.init();
			return;
		}
		this.gridData = new GridData({
			records: this.queryResult.records
		});
		this.count = this.queryResult.count;
		this.columns = this.queryResult.fieldTypes;
		this.records = this.queryResult.records;
	}
}

interface Tile {
	title: string;
	col: number;
	row: number;
	type: TileTypes;
}

enum TileTypes {
	Filter = 0,
	Grid,
	Chart
}
```