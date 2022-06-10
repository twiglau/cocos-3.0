
import { AssetManager, Component, ImageAsset, Node, Sprite, SpriteFrame, sys, SystemEvent, systemEvent } from 'cc';

export class MapCtrl extends Component {

    private mapItemAb: AssetManager.Bundle = null!;
    private mapItemPrefix: string = null;

    private blockSize: number = 256;
    private mapWidth: number = 0;
    private mapHeight: number = 0;
    private viewWidth: number = 0;
    private viewHeight: number = 0;

    // 玩家的初始位置来决定的;
    private orgMapX: number = 0;
    private orgMapY: number = 0;

    // 显示地图块的二维数组;
    private mapSprites: Array<Array<Sprite>> = [];

    public Init(ab: AssetManager.Bundle, mapPrefix: string): void {
        this.mapItemAb = ab;
        this.mapItemPrefix = mapPrefix;
    }

    public InitMapInfo(blockSize: number, 
                       mapWidth: number, mapHeight: number,
                       viewWidth, viewHeight): void {
        this.blockSize = blockSize;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;

        // 将我们的显示面板每个块的精灵，变成我们的二维数组;
        var index = 0;
        for(var i = 0; i < viewHeight; i ++) {
            var lineSprites = [];
            for(var j = 0; j < viewWidth; j ++) {
                var ch = this.node.children[index];
                lineSprites.push(ch.getComponent(Sprite));
                index ++;
            }

            this.mapSprites.push(lineSprites);
        }
        // end
    }
    
    // i行, j列, 是我们可视化显示的i, j,不是地图的i,j ;
    private loadMapBlock(i: number, j: number): void {
        var mapX = j + this.orgMapX;
        var mapY = i + this.orgMapY;

        // 找一下mapY行, Mapx列的图片;
        var imageUrl = this.mapItemPrefix + (mapY + 1) + "_" + (mapX + 1);
        // console.log(imageUrl);

        this.mapItemAb.load(imageUrl, (err, img: ImageAsset)=>{
            this.mapSprites[i][j].spriteFrame = SpriteFrame.createWithImage(img);
        });
    }

    public loadMapAt(playeX: number, playerY: number): void {
        this.orgMapX = this.orgMapY = 0;

        // 初始化好整个的地图块
        for(var i = 0; i < this.viewHeight; i ++) {
            for(var j = 0; j < this.viewWidth; j ++) {
                this.loadMapBlock(i, j);
            }
        }
        // end
    }

    // i, ---> i -1
    private moveShowItemDown(): void {
        // 把 i ---> i - 1,
        for(var i = 1; i < this.viewHeight; i ++) {
            for(var j = 0; j < this.viewWidth; j ++) {
                this.mapSprites[i-1][j].spriteFrame = this.mapSprites[i][j].spriteFrame;
            }
        }

        // 加载新加入地图块
        for(var j = 0; j < this.viewWidth; j ++) {
            this.loadMapBlock(this.viewHeight - 1, j);
        }
        // end
    }

    public moveMap(dx: number, dy: number): void {
        var pos = this.node.getPosition();
        pos.x += dx;
        pos.y += dy;
        

        this.offsetY += dy;
        this.offsetX += dx;

        if(this.offsetY <= -this.blockSize) { // 触发我们的加载条件了;
            
            if(this.orgMapY + this.viewHeight < this.mapHeight) {
                // 调整显示内容
                this.orgMapY ++;
                this.moveShowItemDown();

                // 调整显示的位置, 整体往上一个;
                pos.y += this.blockSize;
                this.offsetY += this.blockSize;
                // end

                // this.isStop = true;
            }
        }

        this.node.setPosition(pos);
    }

    // 测试代码
    private keyCodeMask = 0;
    private offsetY = 0;
    private offsetX = 0;
    private isStop: boolean = false;

    onLoad(): void {
        // 监听键盘事件
        systemEvent.on(SystemEvent.EventType.KEY_DOWN, (event)=>{
            var keyCode = event.keyCode;
            // console.log(keyCode);
            switch(keyCode) {
                case 38: // 上 
                    this.keyCodeMask |= (1<<0);
                break;
                case 40: // 下
                this.keyCodeMask |= (1<<1);
                break;
            }
        }, this);

        systemEvent.on(SystemEvent.EventType.KEY_UP, (event)=>{
            var keyCode = event.keyCode;
            
            switch(keyCode) {
                case 38: // 上 
                    this.keyCodeMask &= ~(1<<0);
                break;
                case 40: // 下  0000 0011
                this.keyCodeMask &= ~(1<<1);
                break;
            }
        }, this);
        // end
    }

    update(dt: number): void {
        if(this.isStop === true) {
            return;
        }

        if(this.keyCodeMask & (1<<0)) {
            this.moveMap(0, -300 * dt);
        }
        if(this.keyCodeMask & (1 << 1)) {
            this.moveMap(0, 300 * dt);
        }
    }
    // end 
}

