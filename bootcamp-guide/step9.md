## step 9. app.component.html

- app.component.html

	>`/bootcamp-2019/bootcamp-app/src/main/bootcamp/src/app/app.component.ts`

	<details>
	<summary>app.component.html</summary>
	<div markdown="1">

	```
	<style>
		:host {
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
			font-size: 14px;
			color: #333;
			box-sizing: border-box;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: 8px 0;
		}

		p {
			margin: 0;
		}


		.toolbar {
			height: 60px;
			display: flex;
			align-items: center;
			background-color: #1976d2;
			color: white;
			font-weight: 600;
		}

		.toolbar span {
			margin-left: 20px;
		}

		.toolbar img {
			margin: 0 16px;
		}


		.content {
			display: flex;
			margin: 32px auto;
			padding: 0 16px;
			max-width: 960px;
			flex-direction: column;
			align-items: center;
		}


		.card-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			margin-top: 16px;
		}

		.card {
			border-radius: 4px;
			border: 1px solid #eee;
			background-color: #fafafa;
			height: 40px;
			width: 200px;
			margin: 0 8px 16px;
			padding: 16px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			transition: all 0.2s ease-in-out;
			line-height: 24px;
		}

		.card-container .card:not(:last-child) {
			margin-right: 0;
		}

		.card.card-small {
			height: 16px;
			width: 168px;
		}

		.card-container .card:not(.highlight-card) {
			cursor: pointer;
		}

		.card-container .card:not(.highlight-card):hover {
			transform: translateY(-3px);
			box-shadow: 0 4px 17px rgba(black, 0.35);
		}

		.card-container .card:not(.highlight-card):hover .material-icons path {
			fill: rgb(105, 103, 103);
		}

		.card.highlight-card {
			background-color: #1976d2;
			color: white;
			font-weight: 600;
			border: none;
			width: auto;
			min-width: 30%;
			position: relative;
		}

		.card.card.highlight-card span {
			margin-left: 60px;
		}


		a,
		a:visited,
		a:hover {
			color: #1976d2;
			text-decoration: none;
		}

		a:hover {
			color: #125699;
		}

		.terminal {
			position: relative;
			width: 80%;
			max-width: 600px;
			border-radius: 6px;
			padding-top: 45px;
			margin-top: 8px;
			overflow: hidden;
			background-color: rgb(15, 15, 16);
		}

		.terminal::before {
			content: "\2022 \2022 \2022";
			position: absolute;
			top: 0;
			left: 0;
			height: 4px;
			background: rgb(58, 58, 58);
			color: #c2c3c4;
			width: 100%;
			font-size: 2rem;
			line-height: 0;
			padding: 14px 0;
			text-indent: 4px;
		}

		.terminal pre {
			font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;
			color: white;
			padding: 0 1rem 1rem;
			margin: 0;
		}
	</style>

	<div class="toolbar" role="banner">
		<span>Bootcamp</span>
	</div>

	<div class="content" role="main">
		<div class="card highlight-card card-small">

	<input style="width:600px;" type="text" [(ngModel)]="query">
	<button (click)="executeQuery()">쿼리 실행</button>
	</div>
		<h2>Query</h2>
		<div class="terminal">
			<pre>{{query}}</pre>
		</div>
		<h2 *ngIf="runQuery"> Result</h2>
		<div *ngIf="runQuery" class="terminal">
				<pre *ngFor="let item of result">{{item | json}}</pre>
		</div>
	</div>

	<router-outlet></router-outlet>
	```
	</div>
	</details>

---
### Bootcamp GUIDE LINKS
* [step 0 - parser setting](step0.md)
	
* [step 1 - 배우는 것들, createAppProject](step1.md)

* [step 2 - manifest.json](step2.md)

* [step 3 - Angular-cli, ng new](step3.md)

* [step 4 - outputPath, base href](step4.md)

* [step 5 - 로그프레소 메뉴에 앱 추가하기](step5.md)

* [step 6 - eediom-sdk, material-cdk](step6.md)

* [step 7 - tsconfig.json, package.json](step7.md)

* [step 8 - app.module.ts, app.component.ts](step8.md)

* [step 9 - app.component.html](step9.md)

* [step 10 - maven build](step10.md)

* [step 11 - 시나리오 기반 데이터 연동](step11.md)