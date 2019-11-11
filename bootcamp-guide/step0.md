## step 0. parser setting

- issue3597 branch full build
- issue3597 cache extract
- brew install yarn
- brew tap adoptopenjdk/openjdk
- brew cask install adoptopenjdk9
- /Users/mac/Documents/bootcamp-2019/ 에 splunk-sdk-java-1.6.5.jar 넣기.
- export JAVA_HOME=`/usr/libexec/java_home -v 9`
- ./run.sh
- telnet localhost 7008
- bundle.install com.google.code.gson gson 2.8.6
- bundle.install commons-cli commons-cli 1.4
- bundle.install file:///Users/mac/Documents/bootcamp-2019/splunk-sdk-java-1.6.5.jar
- bundle.refresh
- bundle.start 110 111 112

- /Users/mac/Documents/bootcamp-2019/ 에서 mvn install:install-file -DgroupId=com.splunk -DartifactId=splunk -Dversion=1.6.5.0 -Dpackaging=jar -Dfile=splunk-sdk-java-1.6.5.jar
- bootcamp/src/main 에 java 폴더채 넣기
- /Users/mac/Documents/bootcamp-2019/bootcamp-app/src/main/resources/metadata.xml 넣기


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
