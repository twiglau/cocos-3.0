
import { _decorator, Component, Node, Label } from 'cc';
import { ComponentBase } from './ComponentBase';
import { Message, MessageType } from './Message';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('HpControl')
export class HpControl extends ComponentBase {
    hp: number = 100;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        UIManager.Instance.RegisterReceiver(this);
    }

    // 接收到的消息
    ReceiveMessage(message: Message): void {
        super.ReceiveMessage(message);
        if(message.Command === MessageType.UI_RefreshHp){
            // 得到参数
            let num = <number>message.Content;
            this.ChangeHp(num);
        }
    }

    ChangeHp(attack:number){
        this.hp -= attack;
        this.getComponent(Label)!.string = `血量: ${this.hp}`
    }
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
