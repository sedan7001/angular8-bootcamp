- 모듈과 컴포넌트 생성 - `ng g m chart-wrapper && ng g c chart-wrapper`

- exports에 component 추가
- ChartModule import
```typescript
// chart-wrapper.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'eediom-sdk';

import { ChartWrapperComponent } from './chart-wrapper.component';

@NgModule({
	declarations: [ ChartWrapperComponent ],
	imports: [ CommonModule, ChartModule ],
	exports: [ ChartWrapperComponent ]
})
export class ChartWrapperModule {}
```

- records를 받아서 차트로 보여주는 컴포넌트
```typescript
// chart-wrapper.component.ts
import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartComponent } from 'eediom-sdk';

@Component({
	selector: 'app-chart-wrapper',
	templateUrl: './chart-wrapper.component.html',
	styleUrls: [ './chart-wrapper.component.less' ]
})
export class ChartWrapperComponent implements OnInit {
	@ViewChild('chart', { static: true })
	chartComponent: ChartComponent;
	@Input()
	set records(records: any[]) {
		if (!records) return;
		this._records = records;

		if (!this.rendered) return;
		this.chartComponent.update(this.chart, this.records);
	}

	get records(): any[] {
		return this._records;
	}
	@Input()
	set chart(chart: Chart) {
		if (!chart) return;

		this._chart = chart;
		this.initChart();
	}

	get chart(): Chart {
		return this._chart;
	}

	ngOnInit(): void {
		this.initChart();
	}

	private rendered: boolean = false;
	private _records: any[];
	private _chart: Chart;
	constructor() {}

	OnInit() {}

	initChart(): void {
		this.chartComponent.render(null, this._chart);
	}

	onRender(): void {
		this.rendered = true;

		if ((this.records || []).length === 0) return;

		this.chartComponent.update(this.chart, this.records);
	}
}
```

- template에 edm-chart를 보여줌
```html
<!-- chart-wrapper.component.html -->
<edm-chart #chart (chartRendered)="onRender()">

</edm-chart>
```