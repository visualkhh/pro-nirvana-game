// import WebSocket = require('ws');
import {TelegramStatusCode} from '../code/TelegramStatusCode';
import {ValidUtil} from '../../../../../../../../lib-typescript/com/khh/valid/ValidUtil';
import {RandomUtil} from '../../../../../../../../lib-typescript/com/khh/random/RandomUtil';

export class Telegram<T> {
    public uuid;
    public action;
    public method;
    public status: number;
    public body: T;

    constructor(action = '', method = '', body: T = new Object() as T, status = TelegramStatusCode.OK, uuid?: string) {
        this.action = action;
        this.method = method;
        this.status = status;
        this.body = body;
        if (ValidUtil.isNullOrUndefined(uuid)) {
            this.uuid = RandomUtil.uuid();
        } else {
            this.uuid = uuid;
        }
    }

}
