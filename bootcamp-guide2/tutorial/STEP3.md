- `metatron-dashboard.component.html` 그리드 부분의 주석을 해제하기
- 에러 로그 확인하고 module에 `GridModule` `import`하기
- 혹시 static 에러가 나온다면 config가 제대로 등록되지 않은 것이니 app.module에 config 등록하기

---
- 현재 페이지 변수 만들기
- pageSize 정하기
---

![미리보기](../images/apply_grid.png)

```typescript
// metatron-dashboard.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MetatronDashboardComponent } from './metatron-dashboard.component';
import { GridModule } from 'eediom-sdk';

@NgModule({
	declarations: [ MetatronDashboardComponent ],
	imports: [ CommonModule, MatGridListModule, GridModule ], // <--
	providers: [],
	exports: [ MetatronDashboardComponent ]
})
export class MetatronDashboardModule {}
```

```typescript
// metatron-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { dummy } from './dummy';
import { environment } from 'src/environments/environment';
import { QueryResult, GridData, ColumnTypes } from 'eediom-sdk';

@Component({
	selector: 'app-metatron-dashboard',
	templateUrl: './metatron-dashboard.component.html',
	styleUrls: [ './metatron-dashboard.component.less' ]
})
export class MetatronDashboardComponent implements OnInit {
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
	count: number;

	// <--
	currentPage: number = 1;
	pageSize: number = 100;
	// <--

	constructor() {}

	ngOnInit() {
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
		}
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

```html
<!--- metatron-dashboard.component.html -->
<mat-grid-list cols="5" rows="7" rowHeight="fit">
	<mat-grid-tile
			*ngFor="let tile of tiles"
			[colspan]="tile.col"
			[rowspan]="tile.row">
		<mat-grid-tile-header>
			{{tile.title}}
		</mat-grid-tile-header>
		<div class="mat-grid-tile-body">
			<ng-container [ngSwitch]="tile.type">
				<ng-template [ngSwitchCase]="0">
					<div class="filter-container">
						<div class="app-filter">
							필터1
							<!-- <app-user-filter [columns]="columns" [queryBuilder]="queryBuilder" (changedQueryBuilder)="onSearch(queryBuilder)"></app-user-filter> -->
						</div>
						<div class="repo-filter">
							필터2
							<!-- <app-repo-filter [queryBuilder]="queryBuilder" (changedQueryBuilder)="onSearch(queryBuilder)"></app-repo-filter> -->
						</div>
					</div>
				</ng-template>
				<ng-template [ngSwitchCase]="1">
					<edm-grid [gridData]="gridData" [pageSize]="100" [currentPage]="currentPage" [totalItems]="count" (pageChanged)="onPage($event)"></edm-grid>
				</ng-template>
				<ng-template [ngSwitchCase]="2">
					차트
					<!-- <app-chart-wrapper [chart]="chart" [records]="records"></app-chart-wrapper> -->
				</ng-template>
			</ng-container>
		</div>
	</mat-grid-tile>
</mat-grid-list>
```