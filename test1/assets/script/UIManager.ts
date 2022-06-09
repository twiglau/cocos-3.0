
import { _decorator, Component, Node } from 'cc';
import { Manager } from './Manager';
import { MessageType } from './Message';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Manager {
     static Instance: UIManager;
     onLoad(): void {
         super.onLoad()
         UIManager.Instance = this;
     }
    

    // 接收的消息类型
    SetMessageType(): number {
        return MessageType.Type_UI;
    }

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

