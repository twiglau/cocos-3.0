
import { _decorator, Component, Node, AssetManager, assetManager, instantiate, Prefab, view } from 'cc';
import { MapCtrl } from './MapCtrl';
const { ccclass, property } = _decorator;

@ccclass('GameApp')
export class GameApp extends Component {
    
    start(): void {
        // step1:加载我们的ab包对象;
        var mapAb: AssetManager.Bundle = null; 
        assetManager.loadBundle("Maps", (err, ab: AssetManager.Bundle)=>{
            this.EnterGame();
        });
    }

    private EnterGame(): void {
        // step2: 从ab包里面读取的地图显示块;
        var mapAb: AssetManager.Bundle = assetManager.getBundle("Maps");
        mapAb.load("Prefabs/Map4x6", (err, mapPrefab: Prefab)=>{
            var map: Node = instantiate(mapPrefab);
            this.node.addChild(map);

            var size = view.getVisibleSize();
            map.setPosition(-size.width * 0.5, -size.height * 0.5);

            var mapCtrl: MapCtrl = map.addComponent(MapCtrl);
            mapCtrl.Init(mapAb, "10005/");
            mapCtrl.InitMapInfo(256, 22, 11, 6, 4);

            mapCtrl.loadMapAt(0, 0);
        });
        // end
    }
}

