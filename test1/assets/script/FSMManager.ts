
import { _decorator, Component, Node } from 'cc';
import { FSMState } from './FSMState';
const { ccclass, property } = _decorator;

@ccclass('FSMManager')
export class FSMManager {
    // 状态列表
    StateList: FSMState[] = [];
    // 当前状态 ID
    CurrentIndex: number = -1;

    // 改变状态
    ChangeState(StateID: number){
        // 改变状态ID
        this.CurrentIndex = StateID;
        // 调用新状态的 enter 方法
        this.StateList[this.CurrentIndex].OnEnter();
    }
    // 更新调用
    OnUpdate(){
        if(this.CurrentIndex != -1){
            // 调用当前状态的update方法
            this.StateList[this.CurrentIndex].OnUpdate();
        }
    }
    
}

