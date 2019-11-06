## 8. app.module.ts, app.component.ts

- app.module.ts

	>`/bootcamp-2019/bootcamp-app/src/main/bootcamp/src/app/app.module.ts`

	```
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { AppRoutingModule } from './app-routing.module';
	import { AppComponent } from './app.component';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
	import { ServiceModule, QueryService } from 'eediom-sdk';
	import { FormsModule } from '@angular/forms';
	@NgModule({
		declarations: [
			AppComponent
		],
		imports: [
			BrowserModule,
			AppRoutingModule,
			BrowserAnimationsModule,
			ServiceModule.forRoot({
				productName: 'Araqne'
			}),
			FormsModule
		],
		providers: [QueryService],
		bootstrap: [AppComponent]
	})
	export class AppModule { }
	```


- app.component.ts

	>`/bootcamp-2019/bootcamp-app/src/main/bootcamp/src/app/app.component.ts`

	```
	import { Component } from '@angular/core';
	import { QueryService } from 'eediom-sdk';
	@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
	})
	export class AppComponent {
		title = 'bootcamp';
		query:string = '';
		result:any = [];
		runQuery:boolean = false;

		constructor(private queryService: QueryService) {
		}

		executeQuery() {
			this.queryService.query(this.query, 100, 0).then((res) => {
			this.result = res.records;
			this.runQuery = true;
			});
		}
	}
	```
