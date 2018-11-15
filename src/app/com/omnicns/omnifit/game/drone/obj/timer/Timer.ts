import {Subscription} from 'rxjs/Subscription';
import {DroneResourceManager} from '../../DroneResourceManager';
import {DroneStage} from '../../stage/DroneStage';
import {DroneStageEvent} from '../../stage/DronStageEvent';
import {ObjDrone} from '../ObjDrone';
import {Score} from '../score/Score';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';
import {Room} from '../../domain/Room';
import {Info} from '../../info/Info';
import {ValidUtil} from '../../../../../../../../../lib-typescript/com/omnicns/valid/ValidUtil';
import {RoomStatusCode} from '../../code/RoomStatusCode';

export class Timer extends ObjDrone {
  // private position: PointVector;
  private velocity: PointVector;
  private acceleration: PointVector;
  private beforeConcentration = 0;
  private concentration = 0;
  private btnText = '-';
  private roomDetailSubscription: Subscription;
  private sizejump = 100;
  constructor(stage: DroneStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    console.log('timer create');
  }

  onDraw(context: CanvasRenderingContext2D): void {
    if (this.btnText.length <= 0) {
      //this.stage.removeObjOnStopDestory(this);
      return;
    }
    const fontPT = this.sizejump--;
    const tw = (context.measureText(this.btnText).width / 2);
    const th = fontPT * 1.5;

    this.x = this.stage.width / 2;
    this.y = this.stage.height / 2;
    const imgStartX = this.x - tw;
    const imgStartY = this.y - th;
    const imgEndX = this.x + this.img.width + tw ;
    const imgEndY = this.y + this.img.height + th ;

    // context.fillStyle = 'blue';
    // context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    //
    context.save();
    context.strokeStyle = '#000000';
    // context.shadowColor = '#000000';
    // context.shadowOffsetX = -1;
    // context.shadowOffsetY = -1;
    // context.font = 'bold  ' + fontPT + 'pt Multicolore';
    context.font = fontPT + 'pt Multicolore';
    context.textAlign = 'center';
    context.textBaseline = 'middle' ;
    context.fillStyle = '#FFFFFF';
    context.lineWidth = 1;
    context.fillText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    context.strokeText(this.btnText, this.stage.width / 2, this.stage.height / 2);
    context.restore();
  }

  onStart(data?: any) {
    console.log('drone start id ' + this.id);
    this.x  = RandomUtil.random(this.stage.width);
    this.y = this.stage.height;
    this.velocity = new PointVector(0, 0);
    this.acceleration = new PointVector(0, 0);
    DroneResourceManager.getInstance().resources('ready_startSound').play();
    this.roomDetailSubscription = this.stage.eventObservable(DroneStageEvent.EVENT_ROOM_DETAIL).filter( (it: Room<any>) => it.status === 'wait' || it.status === 'run').subscribe( (room) => {
      //console.log(room.startCnt + '  ' + room.endCnt);
      this.btnText = room.startCnt;
      this.sizejump = 100;
      if (room.endCnt < Info.END_CNT) {
        this.btnText = '';
      }
      // if (room.startCnt === 8) {
      //   DroneResourceManager.getInstance().resources('applauseSound').play();
      // }
      if (room.status === RoomStatusCode.RUN && room.endCnt === Info.END_CNT - 1) {
        DroneResourceManager.getInstance().resources('startSound').play();
      }
    });

  }

  onStop() {
    if (!ValidUtil.isNullOrUndefined(this.roomDetailSubscription)) {this.roomDetailSubscription.unsubscribe(); }
  }
  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
}
