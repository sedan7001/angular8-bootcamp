import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AnalysisModule } from '../../components/analysis/analysis.module';
import { WidgetManagerModule } from '../../components/widget-manager/widget-manager.module';
import { WidgetModule } from '../../components/widget/widget.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    FormsModule,
    CommonModule,
    AnalysisModule,
    MatGridListModule,
    MatCardModule,

    MatTabsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatIconModule,
    WidgetManagerModule,
    WidgetModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
