
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { ResMgr } from '../Managers/ResMgr';
import { UIMgr } from '../Managers/UIMgr';


export class GameApp extends Component {
    public static Instance:GameApp = null as unknown as GameApp;
    onLoad():void {
        if(GameApp.Instance == null){
            GameApp.Instance = this;
        }
        else {
            this.destroy();
            return;
        }
    }
    // 游戏开始入口
    public gameStart():void {
        var pkg = {
            GUI: {
                assetType: Prefab,
                urls: [
                    "UIPrefabs/UIGame"
                ]
            }
        }
        // // 进入场景的资源要预先加载好, 再进入游戏场景里面;
        ResMgr.Instance.preloadResPkg(pkg, (now:any, total:any)=>{
            console.log(now, total);
        }, ()=>{
            this.EnterGameScene();
        });

    }
    public EnterGameScene():void {
        // 释放游戏地图
        // end

        // 根据地图标记释放角色
        // end

        // 释放UI
        UIMgr.Instance.ShowUIView("UIGame")
    }

    start () {
        // [3]
    }
}
