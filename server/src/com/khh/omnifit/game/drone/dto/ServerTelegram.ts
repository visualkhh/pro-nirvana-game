// import WebSocket = require('ws');
import * as WebSocket from 'ws';
import {TelegramStatusCode} from '../../../../../../../../common/com/khh/omnifit/game/drone/code/TelegramStatusCode';
import {Telegram} from '../../../../../../../../common/com/khh/omnifit/game/drone/domain/Telegram';

export class ServerTelegram<T> extends Telegram<T> {
    public ws: WebSocket;

    constructor(ws: WebSocket, action: string = '', method: string = '', body: T = new Object() as T, status: number = TelegramStatusCode.OK, uuid?: string) {
        super(action, method, body, status, uuid)
        this.ws = ws;
    }

}
