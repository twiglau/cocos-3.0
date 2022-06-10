
import { _decorator, Component, Node, Label } from 'cc';
import { UICtrl } from '../Managers/UICtrl';
const { ccclass, property } = _decorator;

@ccclass('UIGame_Ctrl')
export class UIGame_Ctrl extends UICtrl {
    private versionLabel:Label = null as unknown as Label;
    onLoad(): void {
        super.onLoad();

        // 读取版本号:
        this.versionLabel = this.view["Version"].getComponent(Label);
        this.versionLabel.string = "2.0.0";

        this.AddButtonListener("GameStart", this, this.onGameStartClick);
    }

    private onGameStartClick():void {
        console.log("Game Start");
    }
}

