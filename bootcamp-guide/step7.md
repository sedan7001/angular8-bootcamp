## 7. tsconfig.json, package.json

- tsconfig.json

	>`/bootcamp-2019/bootcamp-app/src/main/bootcamp/tsconfig.json`

	```
	{
		"compileOnSave": false,
		"compilerOptions": {
			"baseUrl": "./",
			"outDir": "./dist/out-tsc",
			"sourceMap": true,
			"declaration": false,
			"downlevelIteration": true,
			"experimentalDecorators": true,
			"module": "esnext",
			"moduleResolution": "node",
			"importHelpers": true,
			"target": "es5",
			"typeRoots": [
			"node_modules/@types"
			],
			"lib": [
			"es2015",
			"es2016",
			"es2017",
			"es2018",
			"dom"
			]
		},
		"angularCompilerOptions": {
			"preserveWhitespaces": true,
			"fullTemplateTypeCheck": true,
			"strictInjectionParameters": true
		}
	}
	```

- package.json


	>`/bootcamp-2019/bootcamp-app/src/main/bootcamp/package.json`

	```
	{
		"name": "test4",
		"version": "0.0.0",
		"bin": {
			"node": "node/node",
			"yarn": "node/yarn/dist/bin/yarn",
			"ng": "node/node node_modules/@angular/cli/bin/ng"
		},
		"scripts": {
			"ng": "ng",
			"start": "ng serve --base-href=/ --open",
			"build": "ng build --output-hashing=none --prod --build-optimizer=false",
			"test": "ng test",
			"lint": "ng lint",
			"e2e": "ng e2e"
		},
		"private": true,
		"dependencies": {
			"@angular/animations": "~8.2.11",
			"@angular/cdk": "~8.2.3",
			"@angular/common": "~8.2.11",
			"@angular/compiler": "~8.2.11",
			"@angular/core": "~8.2.11",
			"@angular/forms": "~8.2.11",
			"@angular/material": "^8.2.3",
			"@angular/platform-browser": "~8.2.11",
			"@angular/platform-browser-dynamic": "~8.2.11",
			"@angular/router": "~8.2.11",
			"eediom-sdk": "https://github.com/logpresso/eediom-sdk.git#v1.0.5",
			"hammerjs": "^2.0.8",
			"rxjs": "~6.4.0",
			"tslib": "^1.10.0",
			"zone.js": "~0.9.1"
		},
		"devDependencies": {
			"@angular-devkit/build-angular": "~0.803.14",
			"@angular/cli": "~8.3.14",
			"@angular/compiler-cli": "~8.2.11",
			"@angular/language-service": "~8.2.11",
			"@types/jasmine": "~3.3.8",
			"@types/jasminewd2": "~2.0.3",
			"@types/node": "~8.9.4",
			"codelyzer": "^5.0.0",
			"jasmine-core": "~3.4.0",
			"jasmine-spec-reporter": "~4.2.1",
			"karma": "~4.1.0",
			"karma-chrome-launcher": "~2.2.0",
			"karma-coverage-istanbul-reporter": "~2.0.1",
			"karma-jasmine": "~2.0.1",
			"karma-jasmine-html-reporter": "^1.4.0",
			"protractor": "~5.4.0",
			"ts-node": "~7.0.0",
			"tslint": "~5.15.0",
			"typescript": "~3.5.3"
		}
	}
	```