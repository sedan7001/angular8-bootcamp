import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardModule } from '../dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { SettingsModule } from '../settings/settings.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { SettingsComponent } from '../settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: DashboardComponent }, { path: 'settings', component: SettingsComponent }],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, DashboardModule, SettingsModule],
  exports: [RouterModule],
})
export class RoutingModule {}
