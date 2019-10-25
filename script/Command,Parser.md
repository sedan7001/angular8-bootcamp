
# BootcampCommand / BootcampParser

## BootcampCommand

- `BootcampCommand.java`
- `BootcampCommandParser.java`

Splunk 로부터 데이터를 불러오기 위해 쿼리에서 `bootcamp` 라는 command 를 사용할 예정입니다.

`BootcampCommand` 에서는 `bootcamp` command 의 역할을 정의할 것이고,
`BootcampCommandParser` 에서는 `bootcamp` command 를 쿼리 창에 입력했을 때 쿼리문을 어떻게 해석할지 정의합니다.

### `bootcamp` 커맨드 스펙
커맨드 `bootcamp` 는 `name` 과 `query` 라는 인자 값을 받습니다.

`name` 에는 `SplunkProfile` (ssh 로 설정) 의 이름이 들어가야 하고 `query` 에는 Splunk 에 요청할 쿼리가 들어가면 됩니다.

``bootcamp name=splunk query="search index=github"`` 와 같은 형식입니다.

### `BootcampCommandParser.java`
쿼리문을 어떻게 해석할지 정의합니다.

`AbstractQueryCommandParser` 를 상속하고 `QueryParserService`, `ConfigService` 를 `@Require` 합니다.

`start()`, `stop()` method 를 작성한 다음

`getCommandName()` // 커맨드 이름 가져오기

`parse(QueryContext context, String comandString)` // 커맨드를 파싱

`commandString` 에 쿼리 창에서 입력한 쿼리문이 들어가 있습니다

`QueryTokenizer.parseOptions(QueryContext context, String commandString, int offset, List<String> validKeys, FunctionRegistry functionRegistry)` 를 이용하여 `ParseResult` 를 얻습니다.

여기서
 `offset` : 커맨드 이름의 길이
 `validKeys` : 파싱할 인자들의 리스트 (이 커맨드의 경우 `name`, `query`)
`functionRegistry` : (Help Wanted)
입니다.

결과로 얻은 `ParseResult` 안에는 커맨드의 인자들이 map 의 형태로 `value` 라는 필드에 담겨있고, 다음 커맨드의 시작 offset 이 들어 있습니다. `ParseResult` 의 map 을 가져와서 `name` 과 `query` 를 가져옵니다.

이제 가져온 `name` 에 해당하는 `SplunkProfile` 을 가져와야 합니다.
confdb 에 `logpresso-bootcamp`  데이터베이스가 없으면 생성하여 가져옵니다.
이제 db 에서 `findOne` 을 이용해 `SplunkProfile` 을 가져오고 (없는 경우에는 `QueryParseException`)
`BootcampCommand` 에 가져온 `profile`과 `query` 를 넘겨줍니다.

### `BootcampCommand.java`
`BootcampCommandParser` 에서 넘겨준 `SplunkProfile` 과 `query` 를 받는 생성자를 작성합니다.

`DriverQueryCommand` 를 상속 (무슨 클래스인지 추후 확인 ..)

`getName()` // 커맨드 이름
`onStart()` // 커맨드 시작
커맨드 시작할 때 Splunk 에 연결합니다.

`onClose()`, `onCancel()` // Splunk 에서 로그아웃

`run()` 에서 본격적인 작업을 수행합니다.

Splunk 에서 수행할 `Job` 을 하나 전역변수로 잡아둡니다.

이제 (Splunk) `Service` 에서 `job` 을 받아와 `create` method 로 쿼리를 실행합니다.
`create(String query, JobArgs args)` 의 형태이므로 `Job` 을 실행할 인자들을 설정하기 위해
`JobArgs` 를 생성하고 `ExecutionMode.NORMAL` 로 지정하여 `create` method 에 넘겨줍니다.

Splunk 에 쿼리가 실행되는 동안 무한루프를 돌고 기다립니다.

`Job`이 끝나면 `InputStream` 으로 결과를 읽어와야 합니다.

결과의 총 개수와, 현재까지 처리한 결과 수를 `resultCount`, `offset` 에 각각 저장하고,
처리할 결과가 남아있고, 쿼리 실행 중지 요청이 들어오지 않는 동안 결과를 읽어옵니다.

결과를 읽어올 때는 `job.getResults(Map args)` 로 가져옵니다.
`args` 에 결과를 몇 개씩 가져올지, 몇 번째 결과를 가져올지 설정하여 `getResults` 를 호출합니다.

`CollectionArgs` 에 이 옵션을 다음과 같이 저장합니다.
`count` : 가져올 결과 개수
`offset` : 몇 번째 결과를 가져올지

이렇게 `getResults` 를 호출하면 `InputStream` 이 리턴됩니다.  `ResultsReaderXml reader` 에 이를 넘겨주어 `reader` 에 `nextEvent` 가 존재하는 동안 계속 읽어옵니다. 읽어온 결과는 `HashMap` 형태로 바꾸어 `pushPipe` 에 `Row` 의 형태로 넘겨주면 쿼리 실행 결과 창에 읽어온 결과가 입력됩니다.

그리고 당연히 `offset` 을 업데이트 해줍니다

이제 `reader` 와 `InputStream` 를 닫아야 하므로 전체를 `try-catch` 로 감싸고 안전하게 `close` 해줍니다.



## BootcampParser


- `BootcampParser.java`
- `BootcampParserFactory.java`

`BootcampParserFactory` 는 UI가 파서 생성을 위해 호출하는 클래스로, 파서의 전체적인 정보를 담고 있습니다.
`BootcampParser` 는 실제 파서의 기능을 정의한 클래스입니다.

### `BootcampParserFactory.java`

파서를 생성하고, 파서의 정보를 담고있는 `BootcampParserFactory` 를 생성합니다.

`AbstractLogParserFactory` 를 상속하고 파서의 정보와 관련된 method 들을 작성합니다.

`getName()` // 파서의 이름

`getDisplayNameLocales()` // 파서 이름을 표시할 언어 목록 가져오기

`getDescriptionLocales()` // 파서 설명을 표시할 언어 목록 가져오기

`getDescription(Locale locale)` // 언어에 맞는 파서 설명 가져오기

`getDisplayGroup(Locale locale)` // 언어에 맞는 파서 그룹의 이름 가져오기
여기서 그룹 이름은 `부트캠프`로 지정해 둡니다.

`createParser()` // 파서 생성
실제로 UI 에서 파서를 생성할 때 이 method 를 호출합니다.
여기서는 `return new BootcampParser()` 를 해주면 파서를 생성하여 리턴해 줍니다.

### `BootcampParser.java`

`V1LogParser` 를 상속합니다. (이유는 ...)
그러면 `parse` 라는 method 하나만 작성해 주면 됩니다.

`parse(Map<String, Object> params)` 는 `params` 를 받아서 키 `line` 에 해당하는 값 (`params.get("line")`) 을 파싱하여 얻은 key 와 그에 해당하는 value 들을 map `m` 에 담아 return 해주는 method 입니다.

(현재 커맨드 `bootcamp` 가 `"_raw"` 로 넘겨주는 상황이므로 `"_raw"` 항목을 가져와 파싱합니다.) 
(Splunk 에서 가져올 때 `_raw` 필드로 가져옴)

로그 형태를 참고하여 `"` 를 기준으로 `split` 한 후 2번째 원소를 가져옵니다.
이제 `<<LF>>\t-` 를 기준으로 한 번 더 `split` 해주면 각 key, value pair 로 분해됩니다.

이제 각 필드를 읽고 저장하면 됩니다.
우선 date 는 `SimpleDateFormat` 을 이용하여 형태에 맞게 `parse` 하여 저장합니다.
나머지 항목들은 `=` 의 index, `idx` 를 기준으로 (`indexOf('=')` 호출)
`substring` 을 이용해 앞 부분은 필드명 `field`, 뒷 부분은 필드의 값 `value` 로 간주합니다.

마지막으로 자료형 타입에 맞도록 특정 필드 이름에 대해서는 형 변환을 해줍니다.
`Long.parseLong(value)`, `Boolean.parseBoolean(value)` 를 이용합니다.

이제 파싱한 값들을 map `m` 에 `put(field, value)` 를 이용해 파싱된 정보를 담아 리턴 해줍니다.


### metadata.xml 수정

이 과정들을 마치고 `resources/metadata.xml` 에 `<instance component />` 로 `BootcampParserFactory` 와 `BootcampCommandParser` 를 등록하면 사용이 가능해집니다.


### UI 에 적용

build 한 후 ssh 로 접속해서 `bundle.replace`, `bundle.refresh` 를 해줍니다.

웹으로 들어가서 `시스템 설정` 탭의 `파서` 메뉴로 들어가
새로운 파서를 생성합니다
그러면 `getDisplayGroup` 에서 지정했던 그룹 이름인 `부트캠프`에 작성한 파서가 있음을 확인할 수 있습니다.

파서를 고르고 이름을 `event` 로 지정하겠습니다.
이제 `쿼리` 탭으로 들어가서 `실행한 쿼리` 뒤에 `"| parse event "` 와 같이 쿼리를 붙여주면 파서를 거친 결과가 나옵니다.

Ex. ``bootcamp name=splunk query="search index=github" | parse event``
