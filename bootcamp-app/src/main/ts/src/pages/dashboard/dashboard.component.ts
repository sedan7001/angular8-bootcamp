import { Component } from '@angular/core';
import { HostAuthService, OverlayService } from 'eediom-sdk';

import { WidgetManagerComponent } from '../../components/widget-manager/widget-manager.component';
import { Widget, WidgetTypes } from '../../components/widget/widget';
import { FieldTypes, QueryService } from '../../service/query.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [QueryService],
})
export class DashboardComponent {
  dashboards: Dashboard[] = [
    {
      widget: null,
      col: 1,
      row: 2,
    },
    {
      widget: null,
      col: 1,
      row: 3,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: new Widget({
        title: '전역 필터',
        type: WidgetTypes.Filter,
      }),
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
    {
      widget: null,
      col: 1,
      row: 1,
    },
  ];
  widgetManager: WidgetManagerComponent;

  constructor(private hostAuthService: HostAuthService, private overlayService: OverlayService) {}
  ngOnInit(): void {
    /**
     * 강제 로그인
     */
    // setTimeout(() => {
    //   this.hostAuthService.login('root', 'eediom_01').then((res) => {});
    // }, 5000);
  }
  onSetting(id: number = 1, dashboard: Dashboard): void {
    if (this.widgetManager) return;
    this.widgetManager = this.overlayService.attach(WidgetManagerComponent);
    if (dashboard.widget) {
      this.setWidgetManagerVariables(this.widgetManager, dashboard);
    }
    this.widgetManager.getData.subscribe((widget?: Widget) => {
      this.widgetManager = null;
      if (!widget) return;
      this.dashboards[id].widget = widget;
    });
  }
  private setWidgetManagerVariables(manager: WidgetManagerComponent, dashboard: Dashboard): void {
    const { widget } = dashboard;
    manager.queryString = widget.query;
    manager.onPreviewQuery().then(() => {
      manager.title = widget.title;
      manager.tick = widget.tick;
      manager.currentType = widget.type;
      if (widget.chartPreset) {
        manager.currentChartType = widget.chartPreset.type;
        manager.currentIndependentVariable = widget.chartPreset.x.key;
        manager.currentDependentVariables = (<FieldTypes[]>widget.chartPreset.y).map((field) => field.key);
      }
    });
  }
}

interface Dashboard {
  widget: Widget;
  col: number;
  row: number;
  data?: any[];
  showEdit?: boolean;
}

enum DashboardTypes {
  Grid = 1,
  Chart,
  Filter,
}
