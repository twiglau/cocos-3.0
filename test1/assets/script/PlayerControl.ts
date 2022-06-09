
import { _decorator, Component, Node, SystemEventType, SystemEvent, systemEvent, EventTouch } from 'cc';
import { MessageType } from './Message';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        this.node.on(SystemEvent.EventType.TOUCH_START, this._onTouchStart, this);
    }

    private _onTouchStart(touch:Touch, event:EventTouch){
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_RefreshHp, 2);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
