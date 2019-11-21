## step 7. app.component.html


### 7-1. app.component.html
- 템플릿 작성
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/app.component.ts`


	```html
	<div class="page-wrapper">
		<div class="wrapper">
			<div class="inner">
				<header id="header">
					<a class="main">
						<span>{{title}}</span>
					</a>
					<a class="link">
						<span>{{link}}</span>
					</a>
				</header>
			</div>
		</div>

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

	</div>

	```


### 7-2. index.html
- 구글 웹폰트 링크

	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/index.html`
		
	```html
	<!doctype html>
	<html lang="en">

	<head>
		<meta charset="utf-8">
		<title>Bootcamp</title>
		<base href="./">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="icon" type="image/x-icon" href="favicon.ico">
		<link href='http://fonts.googleapis.com/css?family=Raleway:300,500,600' rel='stylesheet' type='text/css'>
	</head>

	<body>
		<app-root></app-root>
	</body>

	</html>

	```

### 7-3. styles.less
- 글로벌 스타일 수정

	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/styles.less`
		

	```less
	html, body { height: 100%; }
	body { margin: 0; }
	```
	

### 7-4. loading.gif
	
- 로딩이미지 넣기. 링크 우클릭 -> 다른 이름으로 저장

	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/assets/loading.gif`
		
		
	https://github.com/sedan7001/angular8-bootcamp/blob/master/src/main/bootcamp2/src/assets/loading.gif?raw=true


### 7-5. app.component.less
- less로 스타일 작성

	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/src/app/app.component.less`

	<details>
	<summary>app.component.less</summary>
	<div markdown="1">

	```less
	.page-wrapper {
		font-family: "Raleway", sans-serif;
		transition: opacity 0.5s ease;
		overflow-x: hidden;
		width: 100%;
		height: 100%;
		background-color: #e8eafa;
		-ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}
		&> :first-child {
			background-color: #4e5266;
			padding-top: 1em;
			padding-bottom: 1em;
			overflow: hidden;
		}
		a {
			cursor: pointer;
			text-decoration: none;
		}
		>.wrapper {
			width: 100%;
			>.inner {
				width: 80em;
				max-width: 100%;
				margin-left: auto;
				margin-right: auto;
				#header {
					font-family: "Ubuntu", sans-serif;
					color: #ffffff;
					cursor: default;
					line-height: 1.5;
					position: relative;
					a {
						border-bottom: 0;
						color: inherit;
					}
					>.main {
						span{
							display: inline-block;
							font-size: 1.25em;
							font-weight: 500;
							letter-spacing: 0.1em;
							text-transform: uppercase;
							vertical-align: middle;
						}
					}
					>.link {
						span {
							vertical-align: middle;
							letter-spacing: 0.1em;
							border-left: solid 1px rgba(255, 255, 255, 0.25);
							color: rgba(255, 255, 255, 0.5);
							display: inline-block;
							font-size: 1em;
							margin-left: 0.325em;
							padding-left: 0.825em;
							position: relative;
						}
					}
				}
			}
		}
	}
	@media screen and (max-width: 480px) {
		.page-wrapper {
			#header {
				font-size: 0.8em;
				margin-top: 0.5em;
				height: 44px;
			}
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
	}
	@media screen and (max-width: 1280px) {
		#header {
			margin-left: 1em;
		}
		.wrapper {
			>.inner {
				>.main {
					padding: 3em 4em 2em 4em;
				}
			}
		}
	}




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


---
### Bootcamp GUIDE LINKS
* [step 1 - 배우는 것들](step1.md)

* [step 2 - createAppProject](step2.md)

* [step 3 - Angular-cli로 프로젝트 생성, 빌드와 루트 path 설정](step3.md)

* [step 4 - 로그프레소 메뉴에 앱 추가하기](step4.md)

* [step 5 - eediom-sdk 설치, 타입스크립트 컴파일 설정](step5.md)

* [step 6 - 앵귤러 모듈과 컴포넌트](step6.md)

* ### [step 7 - 템플릿과 less를 활용한 스타일](step7.md)

* [step 8 - 전체 빌드후 앱에 시나리오 기반 데이터 연동](step8.md)

* [step 9 - 라우터 등록, 컴포넌트를 분리하고 라우팅 구현](step9.md)

* [step 10 - 서비스 구현, 컴포넌트간 값 전달.](step10.md)
