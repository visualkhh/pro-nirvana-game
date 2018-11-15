import {Subscription} from 'rxjs/Subscription';
import {DeviceManager} from '../../../../drive/DeviceManager';
import {DroneStage} from '../../stage/DroneStage';
import {ObjDrone} from '../ObjDrone';
import {MoveImg} from '../comm/MoveImg';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';

export class Mountain extends MoveImg  {

  constructor(stage: DroneStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'center';
    // this.imgBaseline = 'middle';
    this.imgBaseline = 'bottom';
  }

  targetPosition(): PointVector {
    return new PointVector((this.stage.width / 2), (this.stage.height));
  }

  startPosition(): PointVector {
    return new PointVector(RandomUtil.random(this.stage.width), this.stage.height + this.img.height);
  }
}
