
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from './ComponentBase';
import { Message, MessageType } from './Message';
import { MessageCenter } from './MessageCenter';
const { ccclass, property } = _decorator;
/**
 * 管理类:
 * 1. 管理所有 消息接受者
 * 2. 规定管理消息类型
 * 3. 注册消息
 * 4. 将接收到消息, 转发所有的子类
 */
@ccclass('Manager')
export class Manager extends ComponentBase {
    // 管理的消息接收者数组
    ReceiveList: ComponentBase[] = [];
    // 当前管理类接收的消息消息具体的类型
    messageType: number = -1;

    onLoad(){
        // 设置当前管理类接收的消息类型
        this.messageType = this.SetMessageType();
        // 把管理类添加到消息中心列表中
        MessageCenter.Manangers.push(this);
    }

    // 设置管理类的消息类型
    SetMessageType(){
        return MessageType.Type_UI;
    }

    // 注册消息监听
    RegisterReceiver(cb: ComponentBase){
        this.ReceiveList.push(cb);
    }

    // 接收消息
    ReceiveMessage(message: Message): void {
        super.ReceiveMessage(message);
        // 判断消息类型
        if(message.Type != this.messageType) return;
        // 向下分发
        for(let cb of this.ReceiveList){
            cb.ReceiveMessage(message);
        }
    }

}

class EnemyManager extends Manager {
    SetMessageType(): number {
        return MessageType.Type_Enemy;
    }
}

