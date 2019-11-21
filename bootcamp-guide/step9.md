## 9. 라우터 등록, 컴포넌트를 분리하고 라우팅 구현하기

### 9-1. ng serve

- 아래 경로에서 `yarn start` 하면 localhost:4200 으로 개발서버 오픈.
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp`
	
### 9-2. main 컴포넌트 생성
- 아래 경로에서 `ng g c main`
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp`
	
### 9-3. trend 컴포넌트 생성
- 아래 경로에서 `ng g c trend`
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp`
	
### 9-4. app.module.ts 확인
- angular cli 로 생성 -> 앱 모듈에 자동 등록.	
	
### 9-5. main.component.ts

1. `app.component.ts` 내용을 전체 복사해서 `main.component.ts` 에 붙이기.
2. `main.component.ts` 4~9번 라인만 아래와 같이 `main`으로 변경
	```typescript
	@Component({
		selector: 'app-main',
		templateUrl: './main.component.html',
		styleUrls: ['./main.component.less'],
	})
	export class MainComponent {
	```
	<details>
	<summary>main.component.ts</summary>
	<div markdown="1">

	```typescript
	import { Component, NgZone, ViewChild } from '@angular/core';
	import { QueryService, SubscribeTypes } from 'eediom-sdk';
	import { GridData, QueryResult, ChartComponent, ChartTypes, LineChartConfigs, Field, Chart } from 'eediom-sdk';
	@Component({
		selector: 'app-main',
		templateUrl: './main.component.html',
		styleUrls: ['./main.component.less'],
	})
	export class MainComponent {
		title: string = 'BOOTCAMP 2019';
		link: string = 'LOGPRESSO';
		@ViewChild('chart', { static: true }) chartComponent: ChartComponent;
		gridData: GridData;
		fieldTypes: QueryResult["fieldTypes"];
		records: QueryResult["records"];
		count: QueryResult["count"];
		chart: Chart;
		query: string = '';
		loading: boolean = false;
		querySuccess: boolean = false;
		isOpen: boolean = false;


		constructor(private queryService: QueryService, private ngZone: NgZone) {
		}

		ngOnInit() {
			this.chart = new Chart(ChartTypes.Area, new LineChartConfigs(
				new Field('_time', 'date', '날짜'),
				[
					new Field('Unreal.js', 'int'),
					new Field('billboard.js', 'int'),
					new Field('iotjs', 'int'),
					new Field('metatron-discovery', 'int'),
					new Field('tui.editor', 'int'),
					new Field('veles', 'int'),
				],
				false
			));
			this.chartComponent.render(null, this.chart);
		}

		executeQuery() {
			this.querySuccess = false;
			this.loading = true;
			this.queryService.query(this.query, (queryId, subscribeData) => {
				if (subscribeData.type === SubscribeTypes.Eof) {
					this.queryService.getResult(queryId, 100, 0).then((queryResult) => {
						this.ngZone.run(() => {
							this.fieldTypes = queryResult.fieldTypes;
							this.count = queryResult.count;
							this.records = queryResult.records;
							this.onRender();
						})
					})
				}
			});
		}

		columnFiltering(columns) {
			const tmp = columns.filter((key) => {
				return key.column !== '_id' && key.column !== '_time' && key.column !== '_table';
			}).map((key) => {
				return new Field(key.column, key.type);
			});
			return tmp;
		}

		onRender(): void {
			setTimeout(() => {
				const filteredColumns = this.columnFiltering(this.fieldTypes);
				this.chart = new Chart(
					ChartTypes.Area, 
					new LineChartConfigs(new Field('_time', 'date', '날짜'), filteredColumns, false)
					);

				this.loading = false;
				this.querySuccess = true;
				this.isOpen = true;
				this.chartComponent.update(this.chart, this.records);
				this.gridData = new GridData({
					records: this.records
				})
			}, 1000)
		}

	}

	```
	</div>
	</details>	
### 9-6. app.component.ts
1. `app.component.ts` 의 `title`, `link` 변수(10번~11번 라인)을 제외한 모든 코드 삭제.
2. `app.component.ts` 임포트 영역에서 `Component` 를 제외하고 모드 삭제.

	```typescript
	import { Component } from '@angular/core';
	@Component({
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.less'],
	})
	export class AppComponent {
		title: string = 'BOOTCAMP 2019';
		link: string = 'LOGPRESSO';
	}

	```

### 9-7. main.component.less
- `app.component.less` 파일의 100번 ~ 361번 라인을 잘라내서 `main.component.less`에 붙이기
	<details>
	<summary>main.component.less</summary>
	<div markdown="1">

	```less
	.keyframes(@name) when (@name = section-animation) {
	    @keyframes @name {
			from {
				margin-top: 10em;
			}
			to {
				margin-top: 2em;
			}
		}
	}
	.keyframes(@name) when (@name = form-animation) {
	    @keyframes @name {
			from {
				margin-top: 5em;
			}
			to {
				margin-top: 0;
			}
		}
	}
	.keyframes(@name) when (@name = sdk-animation) {
	    @keyframes @name {
			from {
				margin-top: 5em;
				opacity: 0;
			}
			to {
				margin-top: 0;
				opacity: 1;
			}
		}
	}
	.keyframes(section-animation);
	.keyframes(form-animation);
	.keyframes(sdk-animation);
	.wrapper {
		width: 100%;
		&.loading {
			margin-top: 10em;
		}
		&.sdk {
			opacity: 0;
		}
		header.major {
			text-align: center;
		}
		h2 {
			color: #434b56;
			line-height: 1.5;
			letter-spacing: 0.1em;
			font-size: 1.75em;
			font-weight: 800;
			margin: 0 0 0.65em 0;
		}
		>.inner {
			width: 80em;
			max-width: 100%;
			margin-left: auto;
			margin-right: auto;
			>.main {
				padding: 0 6em 2em 6em;
				background-color: #e8eafa;
			}
			>.main.accent {
				margin-top: 10em;
				.combined {
					margin-top: 5em;
				}
			}
		}
		form.combined {
			display: -moz-flex;
			display: -webkit-flex;
			display: -ms-flex;
			display: flex;
			-moz-flex-direction: row;
			-webkit-flex-direction: row;
			-ms-flex-direction: row;
			flex-direction: row;
			margin-left: auto;
			margin-right: auto;
			max-width: 100%;
			position: relative;
			width: 35em;
		}
		input {
			font-family: "Raleway", sans-serif;
			font-size: 12pt;
			font-weight: 300;
			line-height: 1.65;
		}
		input[type="text"] {
			-moz-appearance: none;
			-webkit-appearance: none;
			-ms-appearance: none;
			appearance: none;
			font-weight: 800;
			-moz-flex-grow: 1;
			-webkit-flex-grow: 1;
			-ms-flex-grow: 1;
			flex-grow: 1;
			-moz-flex-shrink: 1;
			-webkit-flex-shrink: 1;
			-ms-flex-shrink: 1;
			flex-shrink: 1;
			border: 1px solid rgba(67, 75, 86, 0.25);
			border-bottom-left-radius: 2.75em;
			border-bottom-right-radius: 0;
			border-top-left-radius: 2.75em;
			border-top-right-radius: 0;
			display: block;
			outline: 0;
			padding: 0 1em;
			text-decoration: none;
			height: 2.75em;
			color: rgba(67, 75, 86, 0.8);
			background-color: rgba(241, 246, 254, 0.9);
			&:focus {
				transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
				background: #ffffff;
				color: rgba(67, 75, 86, 0.75);
				border-color: #fed586;
				box-shadow: inset 0 0 0 1px #fed586;
			}
		}
		input[type="submit"] {
			-moz-appearance: none;
			-webkit-appearance: none;
			-ms-appearance: none;
			appearance: none;
			transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
			border-radius: 3.92857em;
			border: 0;
			cursor: pointer;
			display: inline-block;
			font-weight: 600;
			height: 3.92857em;
			line-height: 3.92857em;
			padding: 0 3em;
			text-align: center;
			text-decoration: none;
			white-space: nowrap;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			font-size: 0.7em;
			box-shadow: inset 0 0 0 1px rgba(67, 75, 86, 0.25);
			background-color: #575b72;
			color: #ffffff;
			outline: 0;
			-moz-flex-grow: 0;
			-webkit-flex-grow: 0;
			-ms-flex-grow: 0;
			flex-grow: 0;
			-moz-flex-shrink: 0;
			-webkit-flex-shrink: 0;
			-ms-flex-shrink: 0;
			flex-shrink: 0;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			&:hover {
				background-color: rgba(67, 75, 86, 0.05);
				color: #434b56;
			}
			&:active {
				background-color: rgba(153, 166, 185, 0.7);
			}
		}
		input:-webkit-autofill {
			color: rgba(67, 75, 86, 0.75);
		}
		&::-webkit-input-placeholder {
			opacity: 0.7;
		}
		&:-moz-placeholder {
			opacity: 0.7;
		}
		&::-moz-placeholder {
			opacity: 0.7;
		}
		&:-ms-input-placeholder {
			opacity: 0.7;
		}
		.spotlights {
			box-shadow: 0 0 2em 0 rgba(0, 0, 0, 0.4);
			>article {
				display: -moz-flex;
				display: -webkit-flex;
				display: -ms-flex;
				display: flex;
				-moz-flex-direction: row;
				-webkit-flex-direction: row;
				-ms-flex-direction: row;
				flex-direction: row;
				&:last-child {
					height: 400px;
				}
				.content {
					padding: 4em 5em 2em 5em;
					text-align: center;
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		form.combined {
			-moz-flex-direction: column;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
		}
		#header {
			font-size: 0.8em;
			margin-top: 0.5em;
			height: 44px;
		}
		.page-wrapper {
			& >* {
				padding: 0;
			}
			&> :first-child {
				padding-top: 0;
			}
			&> :last-child {
				padding-bottom: 3em;
			}
		}
		.wrapper {
			>.inner {
				>.main {
					padding: 3em 2em 2em 2em;
				}
			}
		}
	}
	@media screen and (max-width: 1680px) {
		.spotlights {
			>article {
				.content {
					padding: 4em 4em 2em 4em;
				}
			}
		}
	}
	@media screen and (max-width: 736px) {
		.spotlights {
			>article {
				.content {
					padding: 3em 2em 1em 2em;
				}
			}
		}
	}
	@media screen and (max-width: 1280px) {
		.wrapper {
			>.inner {
				>.main {
					padding: 3em 4em 2em 4em;
				}
			}
		}
	}

	```
	</div>
	</details>
	
### 9-8. main.component.html
1. `main.component.html` 파일의 내용을 비운다.
2. `app.component.html` 파일의 15번 ~ 64번 라인을 잘라내서 `main.componet.html`에 붙이기
	<details>
	<summary>main.component.html</summary>
	<div markdown="1">

	```html
	<div class="wrapper">
		<div class="inner">
			<section class="main accent"
				[style.animation]="isOpen ? 'section-animation 1.2s 0.3s 1 ease-in-out forwards': 'none'">
				<header class="major">
					<h2>query</h2>
				</header>
				<form (ngSubmit)="executeQuery()" class="combined"
					[style.animation]="isOpen ? 'form-animation 1s 1.1s 1 ease-in-out forwards': 'none'" autocomplete="off">
					<input [(ngModel)]="query" name="query" type="text" placeholder="query here">
					<input type="submit" value="run">
				</form>
			</section>
		</div>
	</div>
	<div class="wrapper loading" *ngIf="loading">
		<div class="inner">
			<section class="main">
				<header class="major">
					<img src="assets/loading.gif" />
				</header>
			</section>
		</div>
	</div>
	<div class="wrapper sdk" [style.visibility]="querySuccess ? 'inherit': 'hidden'"
		[style.animation]="isOpen ? 'sdk-animation 1s 1.5s 1 ease-in-out forwards': 'none'">
		<div class="inner">
			<section class="main">
				<header class="major">
					<h2>area chart</h2>
				</header>
				<div class="spotlights">
					<article>
						<edm-chart #chart></edm-chart>
					</article>
				</div>
			</section>
			<section class="main">
				<header class="major">
					<h2>grid</h2>
				</header>
				<div class="spotlights">
					<article>
						<edm-grid [gridData]="gridData" [pageSize]="100" [currentPage]="1" [showPager]="false">
						</edm-grid>
					</article>
				</div>
			</section>
		</div>
	</div>

	```
	</div>
	</details>
	
### 9-9. app.component.html
- 5번, 8번 라인에 `routerLink`, `routerLinkActive` 지시자를 추가하고 14번라인에 `router-outlet` 추가
	
	```html
	<div class="page-wrapper">
		<div class="wrapper">
			<div class="inner">
				<header id="header">
					<a routerLink="/main" routerLinkActive="active" class="main">
						<span>{{title}}</span>
					</a>
					<a routerLink="/trend" routerLinkActive="active" class="link">
						<span>{{link}}</span>
					</a>
				</header>
			</div>
		</div>
		<router-outlet></router-outlet>
	</div>
	```
	

### 9-10. app-routing.module.ts
- 라우팅할 컴포넌트들을 등록
	
	```typescript
	import { NgModule } from '@angular/core';
	import { Routes, RouterModule } from '@angular/router';
	import { MainComponent } from './main/main.component';
	import { TrendComponent } from './trend/trend.component';

	const routes: Routes = [
		{ path: 'main', component: MainComponent },
		{ path: 'trend', component: TrendComponent },
		{ path: '', redirectTo: 'main', pathMatch: 'full' },
		{ path: '**', component: MainComponent }
	];

	@NgModule({
		imports: [RouterModule.forRoot(routes)],
		exports: [RouterModule]
	})
	export class AppRoutingModule { }
	```
	
### 9-11. 라우팅 작동확인

- localhost:4200 에서 step9에서 만든 라우팅이 동작하는지 확인.
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

* ### [step 9 - 라우터 등록, 컴포넌트를 분리하고 라우팅 구현](step9.md)

* [step 10 - 서비스 구현, 컴포넌트간 값 전달.](step10.md)
