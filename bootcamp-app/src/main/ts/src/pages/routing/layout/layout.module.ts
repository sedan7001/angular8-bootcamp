import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule.forRoot([]), MatListModule, MatButtonModule, MatSidenavModule],
})
export class LayoutModule {}
