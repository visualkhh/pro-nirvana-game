뇌파 직중력을 이용한 게임
=====================
#### 득도 html canvas game
사용기술
1. angular
2. reactivex
3. typescript
4. html
<br/><br/>

## run
1. npm install
2. ng server -o --host ip --port port

## build
1. ng build  --base-href "."  or ng build --prod --env=prod --output-path=dist-prod/ --base-href "."
2. ./node_modules/@angular/cli/bin/ng build -w -op ../resources/webapp --dev

## device 뇌파 측정기
1. 옴니핏브레인(omnifitBrain)
    * omnifitbrain : http://brain.omnifit.co.kr

## android app build
1. apk download
2. 게임 삽입
    1. ng build 
    2. /storage/_brain/index.html 넣기
3. app 실행
4. Bluetooth 연결
5. 게임 실행
    
### tip
* angular : https://cli.angular.io
* reactivex : http://reactivex.io



<br/><br/><br/><br/><br/>


document, review
================
## project 구성
* git submodule (lib-typescript : https://github.com/visualkhh/lib-typescript.git)
  ``` 
  git submodule init
  git submodule update
  ```

## source
* 뇌파(집중력)값 이벤트  
  src/index.htm
  ```
    function callJS(data) {
      var event = new CustomEvent('omnifit-headset-concentration', {'detail': Number(data)});
      window.dispatchEvent(event);
    }
  ```
  옴니핏브레인 장비에서 웹뷰를 통해 집중력값을 callJS 함수콜 해준다.  
  **장비(bluetooth) -> app -> 뇌파 측정(집중력) -> webView(callJS 함수 호출) -> event**   

<br/>

* ***app <-> 게임 데이터 통신***  
  src/app/omnicns/omnifit/drive/DeviceManager.ts  
  뇌파(집중도) 이벤트 받아올 Observable 생성 및 subscribe
  ```
    private constructor() {
      this._headsetConcentrationObservable = Observable.fromEvent(window, DeviceManager.EVENT_OMNIFIT_HEADSET_CONCENTRATION).map((event: CustomEvent) => Number(event.detail) );
    }
    ...
    public headsetConcentrationSubscribe(next?: (value: number) => void, error?: (error: any) => void, complete?: () => void): Subscription {
      return this._headsetConcentrationObservable.subscribe(next, error, complete);
    }
  ```

<br/>

* ***리소스 관리자***  
  src/app/com/omnicns/omnifit/game/drone/DroneResourceManager.ts
  ```
  export class DroneResourceManager implements LifeCycle {
  ...
  }
  ```
  1. 리소스 등록 및 사용 Map으로 관리

<br/>

* ***게임 스테이지 관리자***  
  src/app/com/omnicns/omnifit/game/drone/DroneStageManager.ts  
  게임 스테이지 이동, 등록, 삭제, 데이터 전송
  ```
  public nextPosition(): number {
    ...
  }
  public previousPosition(): number {
    ...
  }
  public goStage(idx: number, data?: any): DroneStage {
   ...
  }
  public nextStage(data?: any): DroneStage {
    ...
  }
  public previousStage(data?: any): DroneStage {
    ...
  }
  public pushStage(stage: DroneStage): void {
   ...
  }
  public currentStage(): DroneStage {
   ...
  }
  ```
<br/>
  
* ***게임 스테이지 추상클래스***  
  src/app/com/omnicns/omnifit/game/drone/stage/DroneStage.ts
  ```
  export abstract class DroneStage extends Stage implements LifeCycle, ViewInterface {
  ...
  }
  ```
  *  모든 스테이지는 DroneStage 추상클래스를 상속해야한다.  
      1. canvas doubleBuffer
      2. canvas redraw clock 관리
      3. event 관리  
      <br/><br/>
  *  스테이지 종류    
      1. 인트로 : src/app/com/omnicns/omnifit/game/drone/stage/DroneStageIntro.ts
      2. 게임 : src/app/com/omnicns/omnifit/game/drone/stage/DroneStageGame.ts
  
<br/>

* ***게임 오브젝트 추상클래스***  
  src/app/com/omnicns/omnifit/game/drone/obj/ObjDrone.ts  
  ```
  export abstract class ObjDrone extends ObjImg implements LifeCycle, ViewInterface {
  ...
  }
  ```
  *  모든 게임 오브젝트는 ObjDrone 추상클래스를 상속해야한다.  
      1. 이미지, 좌표 관리 (PointVector)
          ```
          export class PointVector {
            private _x: number;
            private _y: number;
            private _z: number;
            ...
          }
          ```
      2. 라이플 사이클
         ```
          abstract onCreate(data?: any);
          abstract onDestroy(data?: any);
          abstract onPause(data?: any);
          abstract onRestart(data?: any);
          abstract onResume(data?: any);
          abstract onStart(data?: any);
          abstract onStop(data?: any);
          abstract onDraw(CanvasRenderingContext2D): void;
         ```
         ![LifeCycle](http://www.ntu.edu.sg/home/ehchua/programming/android/images/Android_ActivityLifeCycle.png)

<br/>


* 공통 lib (lib-typescript : https://github.com/visualkhh/lib-typescript.git)  

* ***게임 시작 (app angular component)***  
  src/app/app.component.ts
  1. 초기화 및 게임 셋팅
    ```
    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
    })
    export class AppComponent implements OnInit, AfterViewInit {
     ...
      constructor(private hostElement: ElementRef, private renderer: Renderer2) {
      }
    
      ngOnInit(): void {
       ...
      }
    
      @HostListener('window:resize', ['$event'])
      onResize(event) {
       ...
      }
    
      ngAfterViewInit(): void {
        //game initialize ...
        //resource initialize ...
        //stage initialize ...
        //object initialize ...
      }
    }
    ```

visualkhh@gmail.com
