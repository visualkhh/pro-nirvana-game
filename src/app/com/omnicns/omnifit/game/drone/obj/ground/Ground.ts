import {DroneStage} from '../../stage/DroneStage';
import {ObjDrone} from '../ObjDrone';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';

export class Ground extends ObjDrone {

  private maxX = 50;
  private currentX = 0;
  private beforeWind = new PointVector();
  constructor(stage: DroneStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
  }
  onDraw(context: CanvasRenderingContext2D): void {
  }

  onStart(data?: any) {
  }

  onStop(data?: any) {
  }

  onCreate(data?: any) {}
  onDestroy(data?: any) {}
  onPause(data?: any) {}
  onRestart(data?: any) {}
  onResume(data?: any) {}

}
