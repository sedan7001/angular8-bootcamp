
otCamp 대본

Command 작성하기

- BootcampCommand.java
- BootcampCommandParser.java

쿼리문에서 bootcamp 라는 command 를 사용할 예정
bootcamp 라는 command 의 역할을 정의한 것이 BootcampCommand 이고
bootcamp 라는 command 를 쿼리 창에 입력했을 때 쿼리문을 어떻게 해석할지 정의한 것이 BootcampCommandParser 입니다

BootcampCommandParser.java

먼저 쿼리문을 어떻게 해석 할지 구현해 봅시다.

이 커맨드는 name 과 query 라는 인자 값을 받습니다.
name 에는 SplunkProfile (ssh 로 설정) 의 이름이 들어가야 하고
query 는 Splunk 에 요청할 쿼리가 들어가면 됩니다 (ex. search ...)

bootcamp name=splunk query="search index=github" 와 같은 형식입니다.

AbstractQueryCommandParser 를 상속하고

QueryParserService, ConfigService 를 @Require 하고
start, stop method 를 작성한 다음

getCommandName() // 커맨드 이름 가져오기
parse(QueryContext, String) // 커맨드를 파싱

parse(QueryContext context, String commandString)
commandString 에 쿼리 창에서 입력한 쿼리 문이 들어가 있습니다

QueryTokenizer.parseOptions() 에 context, commandString, offset 과
파싱할 키 (name, query) 를 리스트로, 또 functionRegistry 를 전달합니다
offset 는 커맨드 이름의 길이 (bootcamp) 가 되겠죠


결과로 ParseResult 가 나오는데 이 안에는 커맨드의 인자가 map 으로 담겨있고, 다음 커맨드의 시작 offset 이 들어 있습니다

이제 이 map 을 가져와서 name 과 query 를 가져옵니다

confdb 에 logpresso-bootcamp 가 없으면 생성하고 가져옵니다
이제 db 에서 findOne 을 이용해 SplunkProfile 을 가져오고
(없는 경우에는 QueryParseException)

가져온 프로파일을 BootcampCommand 에 쿼리문과 함께 같이 넘겨줍니다.

BootcampCommand.java

이제 BootcampCommand 를 작성합니다
BootcampCommand 는 SplunkProfile 과 쿼리문을 받습니다

DriverQueryCommand 를 상속 (무슨 클래스인지 추후 확인 ..)

getName() // 커맨드 이름

onStart() // 커맨드 시작
커맨드 시작할 때 Splunk 에 연결합니다

onClose(), onCancel() // Splunk 에서 로그아웃, 

run() 에서 본격적인 작업을 수행합니다.

Splunk 에서 수행할 Job 을 하나 전역변수로 잡아둡니다

이제 Splunk Service 에서 job 을 받아와 create method 로 쿼리를 실행합니다
이때 Job 을 실행할 인자들을 위해
JobArgs 를 생성하고 ExecutionMode.NORMAL 로 지정하여 create method 에 넘겨줍니다

이 job 이 실행되는 동안 무한루프를 돌고 기다립니다

Job이 끝나면 InputStream 으로 결과를 읽어옵니다

결과의 총 개수와, 현재까지 처리한 결과 수를 저장하고
처리할 결과가 남아있고, 쿼리 실행 중지 요청이 들어오지 않는 동안 읽어옵니다 (while)

결과를 500개씩 가져오고 (count variable)
몇 번째 결과를 가져올지 offset 으로 설정합니다

이를 CollectionArgs 에 담아 getResult 를 호출하면서 넘겨줍니다
리턴 된 InputStream 을 ResultsReaderXml 에 넘겨주고

ResultsReaderXml 에 nextEvent 가 있는 동안 읽어와서 map 으로 변환하고
Row 로 감싸서 pushPipe 해주면 쿼리 실행 결과 창에 나오게 됩니다 

그리고 당연히 offset 을 업데이트 해줍니다

이제 reader 와 is 를 닫아야 하므로 전체를 try catch 로 감싸고 안전하게 close 해줍니다



Parser 작성하기


- Parser.java 생성
- ParserFactory.java 생성

Parser.java

V1LogParser 를 상속합니다.
그러면 parse 라는 method 하나만 작성해 주면 끝이죠.

parse(Map<String, Object> params)

Map 을 받아서 params.get("line") 을 파싱하여 얻은 key 와 그에 해당하는 value 들을
map 에 담아 return 해주는 method 입니다.

(현재 bootcamp 라는 커맨드가 "_raw" 로 넘겨주는 상황 - Splunk 에서 가져올 때 _raw 필드로 가져옴)

로그 형태를 참고하여 " 를 기준으로 split 한 후 2번째 원소를 가져옵니다
이제 <<LF>>\t- 를 기준으로 한 번 더 split 해주면 각 항목별로 분해됩니다

이제 각 필드를 읽고 저장하면 됩니다

우선 date 는 SimpleDateFormat 을 이용하여 형태에 맞게 parse 하여 저장합니다
이제 나머지 항목들은 = 의 index 를 기준으로 
앞 부분은 필드명, 뒷 부분은 필드의 값으로 간주합니다.

마지막으로 자료형 타입에 맞도록 특정 필드 이름에 대해서는 형 변환을 해줍니다

이제 파싱한 값들을 map 에 담아 리턴하면 됩니다.

ParserFactory.java

이제 실제로 파서를 생성해주는 ParserFactory 클래스를 생성합니다.
(Component 이름 지정, Provides annotation ..)

AbstractLogParserFactory 를 상속하고

Method 작성

getName() // 파서의 이름

getDisplayNameLocales() // 파서 이름을 표시할 언어 목록 가져오기

getDescriptionLocales() // 파서 설명을 표시할 언어 목록 가져오기

getDescription(Locale) // 언어에 맞는 파서 설명 가져오기

getDisplayGroup(Locale) // 언어에 맞는 파서 그룹의 이름 가져오기
여기서 그룹 이름은 부트캠프로 지정합니다.

createParser() // 파서 생성
실제로 UI 에서 파서를 생성할 때 이 함수를 호출합니다.
여기서는 return new Parser() 를 해주면 파서가 생성됩니다.



metadata.xml 수정

이 과정들을 마치고 resources/metadata.xml 에 instance component 로
ParserFactory 와 CommandParser 를 등록하면 사용이 가능해집니다


Bundle Replace 및 UI 에 적용

build 한 후 ssh 에 접속해서 bundle.replace, refresh 를 해줍니다.

웹으로 들어가서 시스템 설정 탭의 파서 메뉴로 들어가
새로운 파서를 생성합니다
그러면 getDisplayGroup 에서 지정했던 그룹 이름인 부트캠프에 작성한 파서가 있음을 확인할 수 있습니다.

파서의를 고르고 이름을 event 로 지정하겠습니다

이제 쿼리 탭으로 들어가서 실행한 쿼리 뒤에 "| parse event " 와 같이 쿼리를 붙여주면
파서를 거친 결과가 나오게 됩니다

