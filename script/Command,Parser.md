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
