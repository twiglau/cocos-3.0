
const {ccclass, property} = cc._decorator;

@ccclass
export default class ProtoMgr extends cc.Component {
    public static Instance: ProtoMgr = null;

    private pb: any = null;

    @property(cc.TextAsset)
    private pbTexAsset: cc.TextAsset = null;

    onLoad(): void {
        if(ProtoMgr.Instance === null) {
            ProtoMgr.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        this.pb = protobuf.parse(this.pbTexAsset);
        console.log(this.pb);
    }

    public SerializeMsg(msgName, msgBody): Uint8Array {
        // console.log(msgBody);
        let rs = this.pb.root.lookupType(msgName);
        let msg = rs.create(msgBody);
        
        let buf = rs.encode(msg).finish();

        return buf;
    }

    public DeserializeMsg(msgName, msgBuf: Uint8Array): any {
        let rs = this.pb.root.lookupType(msgName);
        let msg = rs.decode(msgBuf)
        return msg;
    }
}
