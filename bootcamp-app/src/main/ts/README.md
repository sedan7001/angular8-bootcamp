# BOOT_CAMP - EEDIOM-SDK 그리드, 차트, 필터링 (검색 등) 구현

<!-- table sys_cpu_logs | search date("2019-10-28 10:41:16", "yyyy-MM-dd HH:mm:ss") <= field("_time") and date("2019-10-28 10:45:01", "yyyy-MM-dd HH:mm:ss") >= field("_time")   -->

<!--
class Dashboard<T = any[]> {
  col: number;
  row: number;
  widget: Widget;
  originalQuery: string;
  filteredQuery: string;
  records: T;
} -->

## Preview

(마지막 브렌치에 가서 preview로 보여줌)

## EEDIOM-SDK

eediom-sdk는 ui에서 자주 사용하는 컴포넌트를 sdk화 하여 만들어진 SDK입니다.

[스토리 북](https://logpresso.github.io/eediom-sdk/?path=/story/checkbox-%EC%B2%B4%ED%81%AC-%EB%B0%95%EC%8A%A4--%EA%B8%B0%EB%B3%B8-%EC%B2%B4%ED%81%AC-%EB%B0%95%EC%8A%A4)을 통해서 예제와 사용법을 확인 하실 수 있습니다.

### 설치

현재 1.0.4 버전이 릴리즈되었으며 해당 버전으로 작업을 진행합니다.

```yarn add https://github.com/logpresso/eediom-sdk.git#v1.0.4````

###

- 모달 띄워서 쿼리 넣고 작업 하는 모습

이 예제를 새로운 탭에 기준으로 차트, 그리드를 쿼리 기반으로 추가 하고 사용하는 예제를 만들겠습니다.

그리드, 차트, 쿼리를 보내는 Msgbus는 eediom-sdk을 기반으로 만듭니다.
