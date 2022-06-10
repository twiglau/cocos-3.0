
import { _decorator, Component, Node, assetManager, Prefab, AssetManager, Asset } from 'cc';

export class ResMgr extends Component {
    private totalAb: number = 0; // 多少ab包
    private nowAb: number = 0;
    private total: number = 0; // 多少资源
    private now: number = 0;

    private abBunds: any = {};
    private progressFunc: Function|null = null;
    private endFunc: Function|null = null;

    public static Instance: ResMgr = null as unknown as ResMgr;
    onLoad():void {
        if(ResMgr.Instance == null){
            ResMgr.Instance = this;
        }else{
            this.destroy();
            return;
        }

    }
    private loadRes(abBundle: any, url: any, typeClass: any): void {
        abBundle.load(url, typeClass, (error: any, asset: any)=>{
            this.now++;
            if(error){
                console.log("load Res " + url + " error: " + error);
            }
            else {
                console.log("load Res " + url + " success!");
            }
            if(this.progressFunc){
                this.progressFunc(this.now, this.total);
            }
            console.log(this.now, this.total);
            if(this.now >= this.total){
                if(this.endFunc !== null){
                    this.endFunc();
                }
            }
        });
    }
    private loadAssetsBundle(abName: string, endFunc: Function): void {
        assetManager.loadBundle(abName, (err, bundle)=>{
            if(err!==null){
                console.log("[ResMgr]:Load AssetsBundle Error: " + abName);
                this.abBunds[abName] = null;
            }
            else {
                console.log("[ResMgr]: Load AssetsBundle Success: " + abName);
                this.abBunds[abName] = bundle;
            }
            if(endFunc){
                endFunc();
            }
        });
    }
    private loadAssetsInAssetsBundle(resPkg: any):void {
        for(let key in resPkg) {
            let urlSet = resPkg[key].urls;
            let typeClass = resPkg[key].assetType;

            for(let i=0; i < urlSet.length; i++){
                this.loadRes(this.abBunds[key], urlSet[i], typeClass);
            }
        }
    }
    private loadAndRef(abBundle: AssetManager.Bundle, url: string, 
                       typeAsset: any,
                       progress: Function, endFunc: Function): void {

        abBundle.load(url, typeAsset, (err: any, asset: Asset)=>{
            if (err) {
                console.log("load assets: ", err);
                return;
            }

            
            console.log("load asset success：", url);
            asset.addRef(); // 增加一个引用技术;

            this.now ++;
            if(progress) {
                progress(this.now, this.total);
            }
            if(this.now >= this.total) {
                if(endFunc) {
                    endFunc();
                }
            }
        });
    }

    private loadAssetsInUrls(abBundle: AssetManager.Bundle, typeAsset: any, urls: Array<string>, progress: Function, endFunc: Function): void {
        for(let i = 0; i < urls.length; i ++) {
            this.loadAndRef(abBundle, urls[i], typeAsset, progress, endFunc);
        }
    }

    private releaseAssetsInUrls(abBundle: AssetManager.Bundle, typeAsset: any, urls: Array<string>): void {
        for(let i = 0; i < urls.length; i ++) {
            // console.log(urls[i]);
            let asset: Asset = abBundle.get(urls[i]) as Asset;
            if(!asset) {
                continue;
            }

            // console.log(asset.refCount);
            asset.decRef(true);
        }
    }
    /// var pkg = {GUI: { assetType: cc.Prefab, urls: ["", "", ""]}};
    public preloadResPkg(resPkg: any, progressFunc: Function|null, endFunc: Function):void {
        this.total = 0;
        this.now = 0;
        this.totalAb = 0;
        this.nowAb = 0;

        this.progressFunc = progressFunc;
        this.endFunc = endFunc;

        for(let key in resPkg){
            this.totalAb++;
            this.total += resPkg[key].urls.length;
        }

        for(let key in resPkg){
            this.loadAssetsBundle(key, ()=>{
                this.nowAb++;
                if(this.nowAb === this.totalAb){
                    this.loadAssetsInAssetsBundle(resPkg);
                }
            })
        }


    }
    public unloadResPkg(resPkg: any):void {
        for(var key in resPkg) {
            let abBundle: AssetManager.Bundle = assetManager.getBundle(key) as AssetManager.Bundle;
            if(!abBundle) {
                continue;
            }

            if(resPkg[key] instanceof Array) {
                for(let i = 0; i < resPkg[key].length; i ++) {
                    if(resPkg[key][i].isSpritFrams == false){//不是地图加载所需要的图块，如果是地图加载的图块单独走流程
                        this.releaseAssetsInUrls(abBundle, resPkg[key][i].typeAsset, resPkg[key][i].urls);
                    }
                }
            }
            else {
                let typeAsset = resPkg[key];
                let infos = abBundle.getDirWithPath("/");
                let urls: any = [];
                for(let i = 0; i < infos.length; i ++) {
                    urls.push(infos[i].path);
                }
                this.releaseAssetsInUrls(abBundle, typeAsset, urls);
            }
        }

    }
    public preloadRes(abName: string, resUrl: string, typeClass: any, endFunc: Function):void {

        assetManager.loadBundle(abName, (err, abBundle: AssetManager.Bundle)=>{
            if(err) {
                console.log(err);
                return;
            }

            abBundle.load(resUrl, typeClass, (err, asset: Asset)=>{
                if(err) {
                    console.log(err);
                    return;
                }

                if(endFunc) {
                    endFunc();
                }
            });
        });
    }


    public releaseAsset(abName: string, url: string): void {
        var abBundle: AssetManager.Bundle = assetManager.getBundle(abName) as AssetManager.Bundle;
        if(!abBundle) {
            return;
        }

        abBundle.release(url);
    }
    public getAsset(abName: string, resUrl: string): any {
        let bundle = assetManager.getBundle(abName);
        
        if(bundle === null){
            console.log("[error]: " + abName + " AssetsBundle not loaded !!!");
            return null;
        }
        return bundle.get(resUrl);
    }
    
}
