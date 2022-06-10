
import { _decorator, Component, Node, } from 'cc';
const { ccclass, property } = _decorator;
import { GameApp } from './Game/GameApp';
import { ResMgr } from './Managers/ResMgr';
import { UIMgr } from './Managers/UIMgr';
/**
 * 代码入口
 */
@ccclass('GameLaunch')
export class GameLaunch extends Component {
    onLoad():void {
        // 初始化框架的各个模块, 资源管理, UI管理, 网络管理, 日志管理, 声音管理, ....
        this.node.addComponent(ResMgr);
        this.node.addComponent(UIMgr);
        // end

        // 初始化游戏逻辑代码
        this.node.addComponent(GameApp);
        // end

    }
    

    start () {
        // 检查资源更新;
        // end

        // 进入游戏代码的入口逻辑;
        GameApp.Instance.gameStart();
        // end
    }
}

