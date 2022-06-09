
import { _decorator, Component, Node } from 'cc';
import { ComponentBase } from './ComponentBase';
const { ccclass, property } = _decorator;
import { Message } from './Message';
/**
 * 消息中心:
 * 1. 存放所有的管理类
 * 2. 分发消息
 */
@ccclass('MessageCenter')
export class MessageCenter {
    // 管理类列表
    static Manangers: ComponentBase[] = [];

    // 发送消息
    static SendMessage(msg: Message){
        for(let manager of this.Manangers){
            manager.ReceiveMessage(msg);
        }
    }

    // 发送消息
    static SendCustomMessage(type: number, command: number, content: any){
        let msg = new Message(type,command,content);
        MessageCenter.SendMessage(msg);
    }
}
