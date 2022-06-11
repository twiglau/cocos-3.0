
const {ccclass, property} = cc._decorator;

/**
 * 序列化 和 反序列化
 */
@ccclass
export default class ProtoMgr extends cc.Component {
    public static Instance: ProtoMgr = null;

    private pb: any = null;

    // 协议文本对象
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

        // protobuf runtime库, 解析出相应的对象;
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
