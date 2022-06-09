
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Message')
export class Message  {
    // 类型
    Type: number;
    // 命令
    Command: number;
    // 参数
    Content: any;

    // 构造方法
    constructor(type:number, command:number, content:any){
        this.Type = type;
        this.Command = command;
        this.Content = content;
    }
}

export class MessageType {
    static Type_UI = 1;
    static Type_NPC = 2;
    static Type_Enemy = 3;
    static Type_Audio = 4;


    static UI_RefreshHp = 101;
    static UI_RefreshScore = 102;
    static UI_RefreshInventory = 103;

    static NPC_ironsmith = 201;
    static NPC_armor = 202;
    static NPC_passerby = 203;

    static Enemy_werewolf = 301;
    static Enemy_zombie = 302;
}
