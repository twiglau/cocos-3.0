import ProtoMgr from "../Managers/Net/ProtoMgr";
import Cmd from "./Cmd";
import NetEventMgr from "./NetEventMgr";
import Stype from "./Stype";

export default class GameApp extends cc.Component {
    public static Instance: GameApp = null;

    onLoad(): void {
        if(GameApp.Instance === null) {
            GameApp.Instance = this;
        }
        else {
            this.destroy();
            return;
        }


    }
    

    public GameStart(): void {
        // 进入游戏逻辑
        this.scheduleOnce(()=>{
            this.EnterGameScene();
        }, 3)
        
        // end 
    }

    public EnterGameScene(): void {
        // 测试
        var msg = {uname: "blaker", upwd: "202CB962AC59075B964B07152D234B70"};

        // var buf = ProtoMgr.Instance.SerializeMsg("UnameLoginReq", msg);
        // console.log(buf);

        // var msg2 = ProtoMgr.Instance.DeserializeMsg("UnameLogReq", buf);
        // console.log(msg2);



        var stype = Stype.Auth;
        var ctype = Cmd.UnameLoginReq; // 
        NetEventMgr.Instance.sendMsg(stype, ctype, msg);
        // end


        // 释放地图
        // end

        // 释放角色
        // end

        // 释放UI
        // end
    }
}
