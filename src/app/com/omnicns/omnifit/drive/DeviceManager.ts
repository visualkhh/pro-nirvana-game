import 'rxjs/add/observable/interval';
// import 'rxjs/operators/distinctUntilChanged';
import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/operator/merge';
import 'rxjs/add/operator/merge';
// import {Observable} from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {DroneStageManager} from '../game/drone/DroneStageManager';
// import 'rxjs/add/operator/groupBy';
// import 'rxjs/add/operator/mergeAll';

export class DeviceManager {

  static readonly EVENT_OMNIFIT_HEADSET_CONCENTRATION = 'omnifit-headset-concentration';
  static readonly EVENT_OMNIFIT_WEBSOCKET_SEND = 'omnifit-webSocket-send';
  static readonly EVENT_OMNIFIT_ONCREATE = 'omnifit-onCreate';
  static readonly EVENT_OMNIFIT_ONSTART = 'omnifit-onStart';
  static readonly EVENT_OMNIFIT_ONRESUME = 'omnifit-onResume';
  static readonly EVENT_OMNIFIT_ONPAUSE = 'omnifit-onPause';
  static readonly EVENT_OMNIFIT_ONSTOP = 'omnifit-onStop';
  static readonly EVENT_OMNIFIT_ONDESTROY = 'omnifit-onDestroy';
  private static instance: DeviceManager;
  private _headsetConcentrationObservable: Observable<number>;

  //singletone pattern
  //https://basarat.gitbooks.io/typescript/docs/tips/singleton.html
  static getInstance() {
    if (!DeviceManager.instance) {
      DeviceManager.instance = new DeviceManager();
    }
    return DeviceManager.instance;
  }

  private constructor() {
    this._headsetConcentrationObservable = Observable.fromEvent(window, DeviceManager.EVENT_OMNIFIT_HEADSET_CONCENTRATION).map((event: CustomEvent) => Number(event.detail) );
    Observable.fromEvent(window, DeviceManager.EVENT_OMNIFIT_WEBSOCKET_SEND).subscribe((event: CustomEvent) => {
      console.log('mnifit-webSocket-send' + event);
      DroneStageManager.getInstance().webSocketSubject.next(event.detail);
    });
  }

  public fromeEvent(eventName: string, next?: (value: any) => void, error?: (error: any) => void, complete?: () => void): Subscription  {
    const key = Observable.fromEvent(window, eventName);
    return key.subscribe(next, error, complete);
  }
  public dispatchCustomEvent(event: CustomEvent ): boolean {
    return window.dispatchEvent(event);
  }

  get headsetConcentrationObservable(): Observable<number> {
    return this._headsetConcentrationObservable;
  }

  public headsetConcentrationSubscribe(next?: (value: number) => void, error?: (error: any) => void, complete?: () => void): Subscription {
    return this._headsetConcentrationObservable.subscribe(next, error, complete);
  }

  public onCreate(data?: any) { //	called when activity is first created.
    if (window['omnigame'] && window['omnigame'].onCreate) {
      window['omnigame'].onCreate(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onCreate) {
      window['webkit'].messageHandlers.onCreate.postMessage(data);
    }
  }
  public onStart(data?: any) { //	called when activity is becoming visible to the user.
    if (window['omnigame'] && window['omnigame'].onStart) {
      window['omnigame'].onStart(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onStart) {
      window['webkit'].messageHandlers.onStart.postMessage(data);
    }
  }
  public onResume(data?: any) { //	called when activity will start interacting with the user.
    if (window['omnigame'] && window['omnigame'].onResume) {
      window['omnigame'].onResume(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onResume) {
      window['webkit'].messageHandlers.onResume.postMessage(data);
    }
  }
  public onPause(data?: any) { //	called when activity is not visible to the user.
    if (window['omnigame'] && window['omnigame'].onPause) {
      window['omnigame'].onPause(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onPause) {
      window['webkit'].messageHandlers.onPause.postMessage(data);
    }
  }
  public onStop(data?: any) { //	called when activity is no longer visible to the user.
    if (window['omnigame'] && window['omnigame'].onStop) {
      window['omnigame'].onStop(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onStop) {
      window['webkit'].messageHandlers.onStop.postMessage(data);
    }
  }
  public onRestart(data?: any) { //	called after your activity is stopped, prior to start.
    if (window['omnigame'] && window['omnigame'].onRestart) {
      window['omnigame'].onRestart(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onRestart) {
      window['webkit'].messageHandlers.onRestart.postMessage(data);
    }
  }

  /*
  안드로이드
  http://indra17.tistory.com/entry/android-webview%EB%A1%9C-javascript-%ED%98%B8%EC%B6%9C-%EB%B0%8F-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B0%9B%EA%B8%B0
  javascript  native
  ex) window.omnifitAndroid.onDestory

  ISO
  http://g-y-e-o-m.tistory.com/13
  javascript  native
  ex) webkit.messageHandlers.onDestory.postMessage('')
  */

  public onDestroy(data?: any) { //	called before the activity is destroyed.
    if (window['omnigame'] && window['omnigame'].onDestroy) {
      window['omnigame'].onDestroy(data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers.onDestroy) {
      window['webkit'].messageHandlers.onDestroy.postMessage(data);
    }
  }

  public on(fncName: string, data?: any) { //	called
    console.log('Device onCall fncName:' + fncName + ', data:' + data);
    if (window['omnigame'] && window['omnigame'][fncName]) {
      console.log('android Device onCall fncName:' + fncName + ', data:' + data);
      window['omnigame'][fncName](data);
    }else if (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers[fncName]) {
      console.log('ios Device onCall fncName:' + fncName + ', data:' + data);
      window['webkit'].messageHandlers[fncName].postMessage(data);
    }
  }

}
