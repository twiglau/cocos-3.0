
import { _decorator, Component, Node, instantiate, Prefab, find, Sprite } from 'cc';
import { ResMgr } from '../Managers/ResMgr';

export class GameApp extends Component {
    public static Instance: GameApp = null as unknown as GameApp;
    private canvas: Node|null = null;
    private progressBar: Sprite|null = null;

    onLoad():void {
        if(GameApp.Instance == null){
            GameApp.Instance = this;
        }else{
            this.destroy();
            return;
        }
        this.canvas = find("Canvas");
        this.progressBar = this.canvas?.getChildByName("ResLoading")?.getChildByName("UIProgress")?.getChildByName("value")?.getComponent(Sprite) as Sprite;
        this.progressBar.fillRange = 0;
    }

    start () {
        // [3]
    }

    public EnterGame():void {
        console.log( '进入游戏...');
        var resPkg = {
            Maps: {
                assetType: Prefab,
                urls: [
                    "Prefabs/Fisher001",
                ]
            },
            GUI: {
                assetType: Prefab,
                urls:[
                    "UIPrefabs/GameUI",
                    "UIPrefabs/LoginUI"
                ]
            }
        };
        ResMgr.Instance.preloadResPkg(resPkg, (now:number, total:number)=>{
            var per = now / total;
            if(this.progressBar !== null){
                this.progressBar.fillRange = per;
            }

        }, ()=>{
            this.canvas?.destroyAllChildren();
            this.EnterLoginScene()
        })
    }

    public EnterLoginScene(): void {
        // 释放3D 地图
        var mapPerfab = ResMgr.Instance.getAsset("Maps", "Prefabs/Fisher001");
        
        var map = instantiate(mapPerfab);
        this.node.addChild(map);
        // 释放角色
        // 释放UI试图
        let uiPrefab = ResMgr.Instance.getAsset("GUI","UIPrefabs/LoginUI");
        let uiView = instantiate(uiPrefab);
        this.canvas?.addChild(uiView);
    }
}

