## step 5. 빌드, 로그프레소 메뉴에 앱 추가하기

- ng build

	앵귤러 프로젝트 빌드
	outputPath에 저장
	>`/bootcamp-2019/bootcamp-app/src/main/bootcamp/`
	```
	ng build
	```

- logpresso.buildApp

	ng build된 소스들을 번들jar 파일로 

	jar 파일을 install,refresh,start
	
	최초 한번만 빌드, 수정시 번들교체
	
	```
	logpresso.buildApp /Users/mac/Documents/bootcamp-2019/bootcamp-app /Users/mac/Documents/bootcamp-2019/bootcamp-app/bootcamp-app-1.0.0.jar
	bundle.install file:///Users/mac/Documents/bootcamp-2019/bootcamp-app/bootcamp-app-1.0.0.jar
	bundle.refresh
	bundle.start 113
	```

- 맵핑된 URL(step2에서 등록한 app_id)

	```
	httpd.contexts
	```
	<img src="images/servlet.png">

- 등록된 프로그램(step2에서 등록한 program_id)

	```
	dom.programs localhost
	```
	<img src="images/programs.png">

- 메뉴에 추가된 앱 확인.

	브라우저 열고 주소창에 입력
	```
	localhost:8888
	```
	url은 step2에서 지정한 app_id/program_id

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