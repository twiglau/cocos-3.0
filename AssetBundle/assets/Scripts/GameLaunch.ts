
import { _decorator, Component, Node } from 'cc';
import { GameApp } from './Game/GameApp';
import { ResMgr } from './Managers/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('GameLaunch')
export class GameLaunch extends Component {
    public static Instance: GameLaunch = null as unknown as GameLaunch;

    onLoad(){
        if(GameLaunch.Instance == null){
            GameLaunch.Instance = this;
        }else{
            this.destroy();
            return;
        }

        // 初始化游戏框架: 资源管理模块, 网络模块, 协议模块, 日志模块 ....
        this.node.addComponent(ResMgr);
        this.node.addComponent(GameApp);
    }

    start () {
        // 资源检测更新
        GameApp.Instance.EnterGame();
    }
}

