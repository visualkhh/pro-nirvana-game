import {DroneStage} from '../../stage/DroneStage';
import {MoveImg} from '../comm/MoveImg';
import {PointVector} from '../../../../../../../../../lib-typescript/com/omnicns/math/PointVector';
import {RandomUtil} from '../../../../../../../../../lib-typescript/com/omnicns/random/RandomUtil';

export class IntroIcon extends MoveImg {

  constructor(stage: DroneStage, x: number, y: number, z: number, img?: HTMLImageElement) {
    super(stage, x, y, z, img);
    this.imgAlign = 'center';
    this.imgBaseline = 'middle';
  }

  startPosition(): PointVector {
    return new PointVector(RandomUtil.random(this.stage.width), this.stage.height);
  }

  targetPosition(): PointVector {
    // return super.targetPosition();
    return new PointVector((this.stage.width / 2) , (this.stage.height / 2));
    // return new PointVector(0, 0);
  }

}
