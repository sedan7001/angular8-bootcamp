import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatetimePickerModule } from 'eediom-sdk';

import { AnalysisComponent } from './analysis.component';
import { AnalysisService } from './analysis.service';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [CommonModule, DatetimePickerModule, FormsModule, MatButtonModule, MatCardModule],
  exports: [AnalysisComponent],
  providers: [AnalysisService],
})
export class AnalysisModule {}
