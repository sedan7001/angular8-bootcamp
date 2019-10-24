import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { OverlayService, ServiceModule } from 'eediom-sdk';
import { RoutingModule } from 'src/pages/routing/routing.module';
import { QueryService } from 'src/service/query.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot([]),
    RoutingModule,
    ServiceModule.forRoot({
      productName: 'Araqne',
      websocket: {
        websocketUrl: 'ws://localhost:8888/websocket',
      },
    }),
  ],
  providers: [QueryService, OverlayService],
  bootstrap: [AppComponent],
})
export class AppModule {}
