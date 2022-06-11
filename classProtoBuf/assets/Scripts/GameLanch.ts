import GameApp from "./Game/GameApp";
import NetEventMgr from "./Game/NetEventMgr";
import EventMgr from "./Managers/EventMgr";
import NetMgr from "./Managers/Net/NetMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLanch extends cc.Component {
    onLoad(): void {
        // 初始化框架模块: 网络模型，资源管理模块，协议模块，...
        this.node.addComponent(EventMgr);
        this.node.addComponent(NetMgr);
        // end

        // 游戏模块
        this.node.addComponent(NetEventMgr);
        this.node.addComponent(GameApp);
        // end 
    }

    start(): void {
        // 检车资源更新
        // end

        GameApp.Instance.GameStart();
    }
}
