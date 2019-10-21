import { CommonModule } from '@angular/common';
import { NgModule, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HostAuthService, MsgbusService, OverlayService, ServiceModule, WebsocketService, OverlayModule } from 'eediom-sdk';

import { AnalysisModule } from '../components/analysis/analysis.module';
import { WidgetManagerModule } from '../components/widget-manager/widget-manager.module';
import { WidgetModule } from '../components/widget/widget.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueryService } from 'src/service/query.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
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
    ServiceModule.forRoot({
      productName: 'LOGPORESSO_BOOTCAMP',
      websocket: {
        websocketUrl: 'ws://localhost:8888/websocket',
      },
      hostAuth: {
        login: 'com.logpresso.sonar.msgbus.LoginPlugin.login',
        logout: 'com.logpresso.sonar.msgbus.LoginPlugin.logout',
      },
    }),
  ],
  providers: [QueryService, OverlayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
