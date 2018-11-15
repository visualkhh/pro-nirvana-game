import {DroneStage} from '../stage/DroneStage';
import {ObjImg} from '../../../../../../../../lib-typescript/com/omnicns/graphics/ObjImg';
import {LifeCycle} from '../../../../../../../../lib-typescript/com/omnicns/event/life/LifeCycle';
import {ViewInterface} from '../../../../../../../../lib-typescript/com/omnicns/graphics/view/ViewInterface';
import {Point} from '../../../../../../../../lib-typescript/com/omnicns/graphics/Point';

export abstract class ObjDrone extends ObjImg implements LifeCycle, ViewInterface {
  // private _stage: DroneStage | ((_?) => DroneStage);
  private _stage: DroneStage;
  private _id: string;

  constructor(stage: DroneStage, x: number = 0, y: number = 0, z: number = 0, img?: HTMLImageElement, head?: Point) {
    super(x, y, z, img, head);
    this._stage = stage;
  }

  get stage(): DroneStage {
    // if (typeof this._stage === 'function') {
    //   return this._stage();
    // }
    return this._stage;
  }

  set stage(value: DroneStage) {
    this._stage = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  abstract onCreate(data?: any);
  abstract onDestroy(data?: any);
  abstract onPause(data?: any);
  abstract onRestart(data?: any);
  abstract onResume(data?: any);
  abstract onStart(data?: any);
  abstract onStop(data?: any);
  abstract onDraw(CanvasRenderingContext2D): void;

}
