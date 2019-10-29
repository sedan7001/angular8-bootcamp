import { Component, OnInit } from '@angular/core';
import { ChartTypes, Overlay, ColumnTypes, QueryService } from 'eediom-sdk';

import { Widget, WidgetTypes, WidgetTypesID } from '../widget/widget';

@Component({
  selector: 'app-widget-manager',
  templateUrl: './widget-manager.component.html',
  styleUrls: ['./widget-manager.component.less'],
})
export class WidgetManagerComponent extends Overlay {
  queryString: string;
  records: any[];
  count: number;
  verifyQuery: boolean = true;
  fields: ColumnTypes[];

  currentType: WidgetTypesID;
  currentChartType: ChartTypes;

  currentIndependentVariable: string = '';
  currentDependentVariables: string[] = [''];

  dependentVariables: string[] = [''];
  title: string = '';
  tick: number = 10;

  widgetTypes = Object.keys(WidgetTypes).slice(0, 2);
  chartTypes = Object.keys(ChartTypes);
  ChartTypes = ChartTypes;
  readonly chartEnum = ChartTypes;

  constructor(private queryService: QueryService) {
    super();
  }

  onPreviewQuery(): Promise<void> {
    return new Promise((resolve) => {
      this.queryService.query(this.queryString, 100, 0).then((res) => {
        console.log('TCL: WidgetManagerComponent -> res.fieldTypes', res.fieldTypes);
        this.records = res.records;
        this.fields = res.fieldTypes;
        this.onChangeChart();
        resolve();
      });
    });
  }

  onDependentVariable(): void {
    this.currentDependentVariables.push(this.fields[0].column);
    this.dependentVariables.push(this.fields[0].column);
  }

  onChangeChart(): void {
    this.currentDependentVariables = [this.fields[0].column];
    this.dependentVariables = [this.fields[0].column];

    if (this.currentChartType === ChartTypes.TwoLevelPie) {
      this.currentDependentVariables = new Array(3);
      this.dependentVariables = new Array(3);
    }
  }

  onCreateWidget(): void {
    const widget = new Widget({
      query: this.queryString,
      title: this.title,
      tick: this.tick,
      type: this.currentType,
    });

    if (this.currentType === WidgetTypes.Chart) {
      const dependentVariable = this.fields.find((field) => field.column === this.currentIndependentVariable);
      const independentVariables = this.fields.filter((field) => this.currentDependentVariables.indexOf(field.column) !== -1);

      widget.chartPreset = {
        type: this.currentChartType,
        x: dependentVariable,
        y: independentVariables,
      };
    }

    this.putData(widget);
    this.dispose();
  }

  close(): void {
    this.putData(null);
    this.dispose();
  }
}
