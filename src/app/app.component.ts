import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {DroneResourceManager} from './com/omnicns/omnifit/game/drone/DroneResourceManager';
import {DroneStageManager} from './com/omnicns/omnifit/game/drone/DroneStageManager';
import {BackGround} from './com/omnicns/omnifit/game/drone/obj/background/BackGround';
import {Moon} from './com/omnicns/omnifit/game/drone/obj/background/Moon';
import {Mountain} from './com/omnicns/omnifit/game/drone/obj/background/Mountain';
import {Cloud} from './com/omnicns/omnifit/game/drone/obj/cloud/Cloud';
import {IntroIcon} from './com/omnicns/omnifit/game/drone/obj/intro/IntroIcon';
import {IntroPopup} from './com/omnicns/omnifit/game/drone/obj/intro/IntroPopup';
import {IntroTitle} from './com/omnicns/omnifit/game/drone/obj/intro/IntroTitle';
import {Score} from './com/omnicns/omnifit/game/drone/obj/score/Score';
import {Star} from './com/omnicns/omnifit/game/drone/obj/star/Star';
import {DroneStageGame} from './com/omnicns/omnifit/game/drone/stage/DroneStageGame';
import {DroneStageIntro} from './com/omnicns/omnifit/game/drone/stage/DroneStageIntro';
import {Timer} from './com/omnicns/omnifit/game/drone/obj/timer/Timer';
import {Alarm} from './com/omnicns/omnifit/game/drone/obj/alarm/Alarm';
import {DeviceManager} from './com/omnicns/omnifit/drive/DeviceManager';

declare var Processing: any;   // not required
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private title = 'app';

  private canvas: HTMLCanvasElement;
  private droneManager: DroneStageManager;
  private context: CanvasRenderingContext2D | null;
  @ViewChild('canvas') public canvasElementRef: ElementRef;
  private resourceManager: DroneResourceManager;
  private deviceManager: DeviceManager;
  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.canvas = this.canvasElementRef.nativeElement;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    //trigger
    this.canvas.dispatchEvent(new Event('resize'));
  }

  ngAfterViewInit(): void {
    //game initialize
    this.droneManager = DroneStageManager.getInstance(this.canvas);
    this.deviceManager = DeviceManager.getInstance();
    //resource
    this.resourceManager = DroneResourceManager.getInstance();


    //stage Intro
    const droneStageIntro = new DroneStageIntro(this.canvas);
    const introTitle = new IntroTitle(droneStageIntro, 0, 0, 0, DroneResourceManager.getInstance().resources('intro_text_01Img'));
    introTitle.index = 65;
    const introIcon = new IntroIcon(droneStageIntro, 0, 0, 0, DroneResourceManager.getInstance().resources('intro_02Img'));
    introIcon.index = 66;
    const touchScreen = new IntroPopup(droneStageIntro, 0, 0, 0, DroneResourceManager.getInstance().resources('intro_text_02Img'));
    touchScreen.index = 67;
    droneStageIntro.pushObj(introTitle);
    droneStageIntro.pushObj(introIcon);
    droneStageIntro.pushObj(touchScreen);
    const background = new BackGround(this.droneManager, 0, 0, 0);
    background.index = 0;
    droneStageIntro.pushObj(background);
    //Stage Game
    const droneStageGame = new DroneStageGame(this.canvas);
    //background
    droneStageGame.pushObj(background);

    for (let i = 20; i < 40 ; i++) {
      const star = new Star(this.droneManager, 0, 0, 0);
      star.index = i;
      this.droneManager.pushObj(star);
    }


    //moon
    const moon = new Moon(droneStageGame, 0, 0, 0, DroneResourceManager.getInstance().resources('game_bg_moonImg'));
    moon.index = 41;
    droneStageGame.pushObj(moon);
    // droneStageIntro.pushObj(moon);
    //cloud
    for (let i = 50; i < 55 ; i++) {
      const cloud = new Cloud(this.droneManager, 0, 0, 0, DroneResourceManager.getInstance().resources('game_bg_cloud_04Img'));
      cloud.index = i;
      this.droneManager.pushObj(cloud);
    }
    for (let i = 55; i < 60 ; i++) {
      const cloud = new Cloud(this.droneManager, 0, 0, 0, DroneResourceManager.getInstance().resources('game_bg_cloud_05Img'));
      cloud.index = i;
      this.droneManager.pushObj(cloud);
    }
    //mountain
    const mountain = new Mountain(this.droneManager, 0, 0, 0, DroneResourceManager.getInstance().resources('game_bg_mountainImg'));
    mountain.index = 61;
    this.droneManager.pushObj(mountain);

    const score = new Score(droneStageGame, 0, 0, 0, DroneResourceManager.getInstance().resources('gage_00Img'));
    score.id = 'local';
    score.index = 1000;
    const alarm = new Alarm(droneStageGame, 0, 0, 0, DroneResourceManager.getInstance().resources('alarm_iconImg'));
    alarm.index = 1001;
    const timer = new Timer(droneStageGame, 0, 0, 0, DroneResourceManager.getInstance().resources('gage_00Img'));
    timer.index = 1002;
    droneStageGame.pushObj(score);
    droneStageGame.pushObj(alarm);
    droneStageGame.pushObj(timer);


    this.droneManager.pushStage(droneStageIntro);
    this.droneManager.pushStage(droneStageGame);
    this.droneManager.onCreate(this.canvas);
    this.droneManager.onStart();

  }
}
