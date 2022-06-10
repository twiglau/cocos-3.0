
import { _decorator, Component, Node, Button, systemEvent, SystemEvent,Sprite,Size,view, math,Vec3,Vec2,UITransform, find, Camera, v3, instantiate } from 'cc';

import { ResMgr } from './ResMgr';

export class UICtrl extends Component {

    protected view: any = {}; // 路径--->节点; this.view["路径"] --->获得节点;


    //缩放使用的节点
    private picNode:UITransform = null!;
    private mapCanvas: UITransform = null!;
    private mapScaleCameraNode:Node = null!;

    //缩放使用变量
    protected  isCanScale:boolean = false;
    private pointsDis:number = 0;
    private touchCount:number = 0;
    private touchPoint1:Vec3 = null!;
    private touchPoint2:Vec3 = null!;
    private newPointsDis:number = 0;
    private moveStartPos:Vec2 = null!;
    private setStartPos0:Vec2 = null!;
    private setStartPos1:Vec2 = null!;



    private loadAllNodeInView(root: any, path: string) {
        for(let i = 0; i < root.children.length; i ++) {
            this.view[path + root.children[i].name] = root.children[i];
            this.loadAllNodeInView(root.children[i], path + root.children[i].name + "/");
        }
    }

    onLoad(): void {
        // 遍历它下面所有的孩子，然后将所有的节点路径---》节点对象生成到view表里面;
        this.loadAllNodeInView(this.node, "");
    }

    // 按钮事件
    public AddButtonListener(viewName: string, caller: any, func: any) {
        var view_node = this.view[viewName];
        if (!view_node) {
            return;
        }
        
        var button = view_node.getComponent(Button);
        if (!button) {
            return;
        }

        view_node.on("click", func, caller);
    }

    public AddGuid(viewName:string){
        var view_node = this.view[viewName];
        if (!view_node) {
            return;
        }

        // 实例化UI视图出来; 
        var uiPrefab = ResMgr.Instance.getAsset("GUI", "common/prefabs/GuidMask");
        if(!uiPrefab) {
            console.log("cannot find ui Prefab: ", viewName);
            return;
        }

        var uiView: Node = instantiate(uiPrefab) as Node;
        view_node.addChild(uiView);

    }

    public RemGuid(viewName:string){
        var view_node = this.view[viewName];
        if (!view_node) {
            return;
        }

    }


    protected setCanScale(isCan:boolean):void{
        this.isCanScale = isCan;

        if(isCan){

            this.picNode = this.node.getComponent(UITransform) as UITransform;
            this.mapCanvas = find("Canvas")?.getComponent(UITransform) as UITransform;

            this.mapScaleCameraNode = find("Canvas/LoaderCamera") as unknown as Node;

            // this.picNode.node.setScale(new Vec3(GameDatas.Instance.ScaleRatio,GameDatas.Instance.ScaleRatio,1));

            systemEvent.on(SystemEvent.EventType.TOUCH_START, this.OnTouchStart, this);
            systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.OnTouchMove, this);
            systemEvent.on(SystemEvent.EventType.TOUCH_END,this.OnTouchEnded,this);
        }
    }



    protected OnTouchStart(e:any): void {
        
    }

    protected OnTouchMove(event:any): void {

    }

    protected OnTouchEnded(e:any): void {
        if(e._id != 0 && e._id != 1){
            return
        }

        //只有2个手指缩放里面的一个移除的时候
        if(this.touchCount == 1){
            if(e._id == 0){
                this.touchPoint1 = null!;
                this.moveStartPos = this.setStartPos1;
            }
            else if(e._id == 1){
                this.touchPoint2 = null!;
                this.moveStartPos = this.setStartPos0;
            }    
        }

        // GameDatas.Instance.ScaleRatio = this.picNode.node.getScale().x;

        this.touchCount = 0;
    }

    private checkPosition(pos:Vec3):Vec3{
        return new Vec3();
    }



    onDestroy():void{
        console.log("UICtrl-------onDestroy()");
        if(this.isCanScale){
            console.log("UICtrl-------onDestroy()---11111");
            systemEvent.off(SystemEvent.EventType.TOUCH_START, this.OnTouchStart, this);
            systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.OnTouchMove, this);
            systemEvent.off(SystemEvent.EventType.TOUCH_END,this.OnTouchEnded,this);
        }
    }

    // 其他UI事件, ....
}


