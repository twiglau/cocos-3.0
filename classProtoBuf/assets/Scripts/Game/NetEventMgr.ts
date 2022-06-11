import EventMgr from "../Managers/EventMgr";
import NetMgr from "../Managers/Net/NetMgr";
import ProtoMgr from "../Managers/Net/ProtoMgr";
import Cmd from "./Cmd";

export default class NetEventMgr extends cc.Component {
    public static Instance: NetEventMgr = null;

    onLoad () {
        if(NetEventMgr.Instance === null) {
            NetEventMgr.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        EventMgr.Instance.add_event_listenner("net_message", this, this.onRecvData);
    }

    // 收到服务器数据
    private onRecvData(uname, udata: ArrayBuffer): void {
        console.log("接收返回", udata);

        // step1: 读取stype, ctype
        var dataView = new DataView(udata);
        var stype = dataView.getInt16(0, true);
        var ctype = dataView.getInt16(2, true);
        // end

        // step2: 读取出来msgBuf;
        var uint8Buf: Uint8Array = new Uint8Array(udata);
        var msgBuf = uint8Buf.subarray(8);
        var msg = ProtoMgr.Instance.DeserializeMsg(Cmd.Id2Name[ctype], msgBuf);
        // end

        // step3: 派送出去，谁需要就派送出去;
        console.log({stype: stype, ctype: ctype, msg: msg});
        // end
    }

    public sendMsg(stype, ctype, msg): void {
        // 发送数据出去;
        // step1: 吧数据body --->二进制;
        let msgBuf = ProtoMgr.Instance.SerializeMsg(Cmd.Id2Name[ctype], msg);
        if(msgBuf === null) {
            return;
        }
        // end

        
        var total_len = msgBuf.length + 2 + 2 + 4; // 
        var buf = new ArrayBuffer(total_len);

        // step2: 打入stype(2字节), ctype(2字节), 4个字节（预留）;
        var dataview = new DataView(buf);
        dataview.setInt16(0, stype, true);
        dataview.setInt16(2, ctype, true);
        dataview.setInt32(4, 0, true);
        // end
        
        // step3: 打入我们msgBuf;
        var uint8Buf = new Uint8Array(buf);
        uint8Buf.set(msgBuf, 8);
        // end

        // step4: WebSocket ---》
        NetMgr.Instance.send_data(buf);
    }
}
