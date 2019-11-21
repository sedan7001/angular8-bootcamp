## step 4. 빌드, 로그프레소 메뉴에 앱 추가하기

### 4-1. ng build

- 앵귤러 프로젝트 빌드
- outputPath에 저장
	>`/bootcamp-2019-base/bootcamp-app/src/main/bootcamp/`
	```
	ng build
	```

### 4-2. logpresso.buildApp, bundle.install

- ng build된 소스들을 번들jar 파일로 
- jar 파일을 install,refresh,start
- 최초 한번만 빌드, 수정시 번들교체
	
	```
	logpresso.buildApp /Users/mac/Documents/bootcamp-2019-base/bootcamp-app /Users/mac/Documents/bootcamp-2019-base/bootcamp-app/target/bootcamp-app-1.0.0.jar
	bundle.install file:///Users/mac/Documents/bootcamp-2019-base/bootcamp-app/target/bootcamp-app-1.0.0.jar
	bundle.refresh
	bundle.start 113
	```
	
### 4-3. 맵핑된 URL(app_id)
- logpresso.buildApp, bundle.install 하면  telnet 에서 app_id, program_id 조회 가능
- app_id 조회 커맨드

	```
	httpd.contexts
	```
	<img src="images/servlet.png">

### 4-4 등록된 프로그램
- program_id 조회 커맨드
	```
	dom.programs localhost
	```
	<img src="images/programs.png">

### 4-5 로그프레소 메뉴에 앱이 추가되었는지 확인.

- 브라우저 주소창에 입력
	```
	localhost:8888
	```

---
### Bootcamp GUIDE LINKS
* [step 1 - 배우는 것들](step1.md)

* [step 2 - createAppProject](step2.md)

* [step 3 - Angular-cli로 프로젝트 생성, 빌드와 루트 path 설정](step3.md)

* ### [step 4 - 로그프레소 메뉴에 앱 추가하기](step4.md)

* [step 5 - eediom-sdk 설치, 타입스크립트 컴파일 설정](step5.md)

* [step 6 - 앵귤러 모듈과 컴포넌트](step6.md)

* [step 7 - 템플릿과 less를 활용한 스타일](step7.md)

* [step 8 - 전체 빌드후 앱에 시나리오 기반 데이터 연동](step8.md)

* [step 9 - 라우터 등록, 컴포넌트를 분리하고 라우팅 구현](step9.md)

* [step 10 - 서비스 구현, 컴포넌트간 값 전달.](step10.md)
