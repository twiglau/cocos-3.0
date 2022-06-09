
import { _decorator, Component, Node } from 'cc';
import { FSMManager } from './FSMManager';
const { ccclass, property } = _decorator;

@ccclass('FSMState')
export class FSMState {
    // 当前状态 ID
    StateID: number;
    // 状态哦拥有者
    component: Component;
    // 所属状态机
    fsmManager: FSMManager;

    constructor(stateID: number, component: Component, fsmMananger: FSMManager) {
        this.StateID = stateID;
        this.component = component;
        this.fsmManager = fsmMananger;
    }

    // 进入状态
    OnEnter(){}
    // 状态更新
    OnUpdate(){}
    
}