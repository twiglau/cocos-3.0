
import { _decorator, Component, Node } from 'cc';
import { DieState } from './DieState';
import { FlyState } from './FlyState';
import { FSMManager } from './FSMManager';
const { ccclass, property } = _decorator;

enum BirdState {
    fly,
    die,
}
@ccclass('BirdControl')
export class BirdControl extends Component {
    

    // 状态机
    fsmManager: FSMManager = null as unknown as FSMManager;
    start () {
        this.fsmManager = new FSMManager();
        // 创建两个状态
        let fly = new FlyState(BirdState.fly, this, this.fsmManager);
        let die = new DieState(BirdState.die, this, this.fsmManager);
        this.fsmManager.StateList = [fly, die];
        // 开始执行状态
        this.fsmManager.ChangeState(BirdState.fly);
    }

    update(dt:number){
        if(this.fsmManager.CurrentIndex != -1){
            this.fsmManager.OnUpdate();
        }
    }

    fly(){
        this.fsmManager.ChangeState(BirdState.fly);
    }
    die(){
        this.fsmManager.ChangeState(BirdState.die);
    }
}
