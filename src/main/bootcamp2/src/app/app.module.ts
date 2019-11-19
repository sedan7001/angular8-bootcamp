import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule, QueryService, GridModule, ChartModule } from 'eediom-sdk';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ServiceModule.forRoot({
			productName: 'Araqne'
		}),
		FormsModule,
		GridModule,
		ChartModule,
		CommonModule
	],
	providers: [QueryService],
	bootstrap: [AppComponent]
})
export class AppModule { }