## 10. 서비스 구현, 컴포넌트간 값 전달.


### 10-1. trend 클래스 생성.
- 아래 경로에 `trend.ts` 파일 생성.
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/service`

	```typescript
	export class Trend {
			'Unreal.js' : number;
			'billboard.js': number;
			'_table': string;
			'metatron-discovery': number;
			'veles': number;
			'tui.editor': number;
			'_id': number;
			'iotjs': number;
			'_time': string
	}
		```
### 10-2. trend 클래스 생성.
- 아래 경로에 `trend.mock.ts` 파일 생성.
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/service`

	```typescript
	import { Trend } from './trend';

	export const TRENDS: Trend[] = [
		{
			"Unreal.js": 1,
			"billboard.js": 3,
			"_table": "trends",
			"metatron-discovery": null,
			"veles": null,
			"tui.editor": 3,
			"_id": 61,
			"iotjs": 1,
			"_time": "2018-06-25 00:00:00+0900"
		},
		{
			"Unreal.js": 6,
			"billboard.js": 16,
			"_table": "trends",
			"metatron-discovery": null,
			"veles": 4,
			"tui.editor": 47,
			"_id": 60,
			"iotjs": 8,
			"_time": "2018-07-02 00:00:00+0900"
		},
		{
			"Unreal.js": 13,
			"billboard.js": 7,
			"_table": "trends",
			"metatron-discovery": null,
			"veles": 1,
			"tui.editor": 64,
			"_id": 59,
			"iotjs": 6,
			"_time": "2018-07-09 00:00:00+0900"
		},
		{
			"Unreal.js": 6,
			"billboard.js": 13,
			"_table": "trends",
			"metatron-discovery": null,
			"veles": 7,
			"tui.editor": 44,
			"_id": 58,
			"iotjs": 6,
			"_time": "2018-07-16 00:00:00+0900"
		},
		{
			"Unreal.js": 2,
			"billboard.js": 13,
			"_table": "trends",
			"metatron-discovery": 1,
			"veles": 3,
			"tui.editor": 44,
			"_id": 57,
			"iotjs": 5,
			"_time": "2018-07-23 00:00:00+0900"
		},
		{
			"Unreal.js": 8,
			"billboard.js": 10,
			"_table": "trends",
			"metatron-discovery": null,
			"veles": 1,
			"tui.editor": 35,
			"_id": 56,
			"iotjs": 4,
			"_time": "2018-07-30 00:00:00+0900"
		}
	]
	```
### 10-3. trend 서비스 생성.

- 아래 경로에서 `ng g s trend`
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/service`

- trend.service.ts
	```typescript
	import { Injectable } from '@angular/core';
	import { Trend } from './trend';
	import { TRENDS } from './trend.mock';

	@Injectable({
		providedIn: 'root'
	})
	export class TrendService {

		constructor() { }
		
		getTrends(): Promise<Trend[]> {
			return Promise.resolve(TRENDS);
		}
	}	
	```
### 10-4. app 모듈에서 서비스 임포트.
- app.module.ts 에서 서비스를 import 하고 providers 속성에 등록.
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/app.module.ts`

	```typescript
	import { BrowserModule } from '@angular/platform-browser';
	import { NgModule } from '@angular/core';
	import { AppRoutingModule } from './app-routing.module';
	import { AppComponent } from './app.component';
	import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
	import { ServiceModule, QueryService, GridModule, ChartModule } from 'eediom-sdk';
	import { FormsModule } from '@angular/forms';
	import { CommonModule } from '@angular/common';
	import { MainComponent } from './main/main.component';
	import { TrendService } from './trend.service';
	import { TrendComponent } from './trend/trend.component';
	import { TrendChildComponent } from './trend/trend-child/trend-child.component';

	@NgModule({
		declarations: [
			AppComponent,
			MainComponent,
			TrendComponent,
			TrendChildComponent
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
		providers: [QueryService,TrendService],
		bootstrap: [AppComponent]
	})
	export class AppModule { }	
	```
		
### 10-5. trend-child 컴포넌트 생성.
- 아래 경로에서 `ng g c trend-child`
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/trend`
- trend-child.componet.ts
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/trend/trend-child/trend-child.component.ts`
	```typescript
	import { Component, OnInit, Input } from '@angular/core';
	import { Trend } from '../../service/trend';

	@Component({
	  selector: 'app-trend-child',
	  templateUrl: './trend-child.component.html',
	  styleUrls: ['./trend-child.component.less']
	})
	export class TrendChildComponent implements OnInit {

		@Input() childTrends: Trend[];
		
	  constructor() { }
	  ngOnInit() {
	  }
	}
	```
- trend-child.component.html
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/trend/trend-child/trend-child.component.html`
	```html
	<div class="wrapper">
		<div class="inner">
			<section class="main">
				<header class="major">
					<h2>trend-child component</h2>
				</header>
				<div class="spotlights" >
					<pre *ngFor="let trend of childTrends">{{trend|json}}</pre>
				</div>
				<div class='terminal'>
				</div>
			</section>
		</div>
	</div>	
	```
- trend-child.component.less
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/trend/trend-child/trend-child.component.less`
	```less
	.keyframes(@name) when (@name = trend-animation) {
	    @keyframes @name {
			from {
				opacity: 0;
				height: 0;
			}
			to {
				opacity: 1;
				height: 51em;
			}
		}
	}
	.keyframes(trend-animation);
	:host {
		font-size: 15px;
	}
	.wrapper {
		width: 100%;
		>.inner {
			width: 80em;
			max-width: 100%;
			margin-left: auto;
			margin-right: auto;
			>.main {
				background-color: #e8eafa;
				width: 50em;
				max-width: 100%;
				margin-left: auto;
				margin-right: auto;
				h2 {
					color: #434b56;
					line-height: 1.5;
					letter-spacing: 0.1em;
					font-size: 1.75em;
					font-weight: 800;
					margin: 0 0 0.65em 0;
				}
				header.major {
					text-align: center;
					margin-top: 3em;
					margin-bottom: 3em;
					transition: opacity .5s linear 2s;
				}
				.spotlights {
					box-shadow: 0 0 2em 0 rgba(0, 0, 0, 0.4);
					position: relative;
					border-radius: 6px;
					margin-top: 8px;
					height: 51em;
					overflow: auto;
					opacity: 0;
					-ms-overflow-style: none;
					&::-webkit-scrollbar {
						display: none;
					}
					animation: trend-animation 2.7s 0.3s 1 ease-in-out forwards;
				}
				pre {
					margin-top : 3em;
					width: 20em;
					max-width: 100%;
					margin-left: auto;
					margin-right: auto;
					color: #4e5266;
					transform:scale(1);
					transition:.4s;
					font-weight: 500;
				}
				pre:hover{
					transform:scale(1.1);
				}
			}
		}
	}
	```
### 10-6. trend 컴포넌트와 trend-child 컴포넌트간 통신.
- trend.componet.ts
	```typescript
	import { Component, OnInit } from '@angular/core';
	import { TrendService } from '../service/trend.service';
	import { Trend } from '../service/trend';

	@Component({
		selector: 'app-trend',
		templateUrl: './trend.component.html',
		styleUrls: ['./trend.component.less']
	})
	export class TrendComponent implements OnInit {

		parentTrends:Trend[];
		
		constructor(private trendService: TrendService) { }

		ngOnInit(): void {
			this.getTrends();
		}

		getTrends(): void {
			this.trendService.getTrends().then(data => this.parentTrends = data);
		}
	}
	```

- trend.componet.html
	```html
	<app-trend-child [childTrends]="parentTrends"></app-trend-child>
	```
### 10-7. 빌드 후 bootcamp 앱 확인

- 메이븐 인스톨, 번들 교체.

	>`/bootcamp-2019-base/bootcamp-app/`
	```
	$ mvn clean install
	```
	>`araqne console`

	```
	bundle.replace 113 file:///Users/mac/Documents/bootcamp-2019-base/bootcamp-app/target/bootcamp-app-1.0.0.jar
	bundle.refresh
	```
		
---
### Bootcamp GUIDE LINKS
* [step 1 - 배우는 것들](step1.md)

* [step 2 - createAppProject](step2.md)

* [step 3 - Angular-cli로 프로젝트 생성, 빌드와 루트 path 설정](step3.md)

* [step 4 - 로그프레소 메뉴에 앱 추가하기](step4.md)

* [step 5 - eediom-sdk 설치, 타입스크립트 컴파일 설정](step5.md)

* [step 6 - 앵귤러 모듈과 컴포넌트](step6.md)

* [step 7 - 템플릿과 less를 활용한 스타일](step7.md)

* [step 8 - 전체 빌드후 앱에 시나리오 기반 데이터 연동](step8.md)

* [step 9 - 라우터 등록, 컴포넌트를 분리하고 라우팅 구현](step9.md)

* ### [step 10 - 서비스 구현, 컴포넌트간 값 전달.](step10.md)		