
import { _decorator, Component, Node, assetManager, Prefab } from 'cc';

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

    }
    public preloadRes(abName: string, resUrl: string, progressFunc: Function, endFunc: Function):void {}
    public getAsset(abName: string, resUrl: string): any {
        let bundle = assetManager.getBundle(abName);
        
        if(bundle === null){
            console.log("[error]: " + abName + " AssetsBundle not loaded !!!");
            return null;
        }
        return bundle.get(resUrl);
    }
    
}
