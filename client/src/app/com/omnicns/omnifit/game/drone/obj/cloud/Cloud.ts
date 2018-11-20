import {Subscription} from 'rxjs/Subscription';
import {DroneStage} from '../../stage/DroneStage';
import {ObjDrone} from '../ObjDrone';
import {ValidUtil} from '../../../../../../../../../../lib-typescript/com/khh/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../../../lib-typescript/com/khh/random/RandomUtil';
import {MathUtil} from '../../../../../../../../../../lib-typescript/com/khh/math/MathUtil';
export class Cloud extends ObjDrone {

  private resizeSubscription: Subscription;
  constructor(stage: DroneStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
  }

  onDraw(context: CanvasRenderingContext2D): void {
    this.x += this.mass;
    context.drawImage(this.img, this.x, this.y);
    //checkEdges
    if (this.x > this.stage.width) {
      this.initSetting();
      this.x = -this.img.width;
    }
  }

  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}
  onStart(data?: any) {
    this.initSetting();
    this.resizeSubscription = this.stage.canvasEventSubscribe('resize', (event: Event) => this.initSetting());
  }

  onStop(data?: any) {
    if (!ValidUtil.isNullOrUndefined(this.resizeSubscription)) {this.resizeSubscription.unsubscribe(); }
  }

  initSetting() {
    this.x = RandomUtil.random(0, this.stage.width);
    this.y = RandomUtil.random(0, MathUtil.getValueByTotInPercent(this.stage.height, 70));
    this.mass = Math.random();
  }

}
