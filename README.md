# bootcamp-2019

## eediom-sdk, material-cdk 설치하기

### eediom-sdk

`$ yarn install https://github.com/logpresso/eediom-sdk.git#v1.0.2`: eediom에서 만든 sdk를 설치
 
### material-cdk

`$ yarn global add @angular/cli`: angular-cli를 설치
`$ ng add @angular/material`: [material-cdk](https://material.angular.io/guide/getting-started)를 설치

```
? Choose a prebuilt theme name, or "custom" for a custom theme: Indigo/Pink: 원하는 테마를 선택
? Set up HammerJS for gesture recognition?:  제스처 라이브러리 / YES or NO 둘다 괜찮음 
? Set up browser animations for Angular Material?: 머터리얼에 에니메이션을 추가할 수 있는데 그 기능에 대한 물음 / YES or NO 둘다 괜찮음
```

## 새로운 라우트 페이지 만들기

### 라우트 분리

구현된 로직을 보면 route를 분리했습니다. 몇 가지 이유 때문에 그렇게 사용하고 있는데요

- app.component가 너무 무거워짐
- app.module을 관리하기 힘들어짐
- app.routing.module을 관리하기 힘들어짐

위의 이유로 라우터를 분리하여 구현하는 것을 선호합니다.

### 만들어 보기

`/src/pages`에 새로운 페이지를 추가하고 라우터에 해당 페이지를 링크 해보겠습니다.

#### 모듈 및 컴포넌트 생성

아래의 경로의 주의해주세요 아래는 `src/pages`에서 작업 중 입니다.
`ng g m index && ng g c index`

#### 모듈에 exports 추가

모듈 exports에 위에서 만든 `IndexComponent`를 추가해주세요

```
// index.module
@NgModule({
  declarations: [IndexComponent],
  exports: [IndexComponent],
})
```

#### routing.module에 해당 module및 라우팅 추가

```
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent }, 
      { path: 'settings', component: SettingsComponent }],
      { path: 'index', component: IndexComponent }], // indexComponent 추가
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, DashboardModule, SettingsModule, IndexModule], //IndexModule 추가
  exports: [RouterModule],
})
```

## 그리드 사용하기

[EEDIOM-SDK의 grid 예제 페이지](https://logpresso.github.io/eediom-sdk/?path=/story/grid-%EA%B7%B8%EB%A6%AC%EB%93%9C--plain) - notes로 설명을 볼 수 있습니다.
[Grid-wrapper.component](https://github.com/logpresso/bootcamp-2019/blob/master/bootcamp-app/src/main/ts/src/components/grid-wrapper/grid-wrapper.component.ts)

부트캠프 프로젝트에서는 그리드를 직접적으로 사용하지 않고 wapper를 사용하여 한번 더 묶어주는 것을 보실 수 있습니다. 그 이유로는

- 자주쓰는 옵션 미리 등록
- records가 없는 경우 처리

### 그리드에 데이터 보내기

`GridData` 타입으로 보내주셔아 합니다. *자세한 설명은 예제 페이지의 notes를 읽어주세요*

GridData 타입의 records를 넣어주시면 자동으로 해당 데이터를 기준으로 grid를 생성합니다.
