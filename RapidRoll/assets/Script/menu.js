// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        bgSound: cc.AudioClip,
        btnSound: cc.AudioClip,
        bestScore:cc.Label,

        historyNode: cc.Node,
        cloud: cc.Node,
        cloudSpeed: 0,
    },

    onLoad: function() {
        cc.audioEngine.playMusic(this.bgSound, true);
        this.record = cc.find("Record").getComponent("record");
        this.bestScore.string = "SCORE " + this.record.bestScore;
        //返回键退出游戏
        let self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function(keyCode, event) {
                if(keyCode == cc.KEY.back){
                    self.record.save();
                    cc.director.end();
                }
            }
        }, self.node);
    },

    onBtnStart: function () {
        cc.audioEngine.playEffect(this.btnSound);
        cc.director.loadScene("GameScene");
    },

    onBtnScore: function () {
        this.historyNode.active = true;
    },

    onBtnReturn: function () {
        this.historyNode.active = false;
    },

    update (dt) {
        this.cloud.y += this.cloudSpeed * dt;
        //cc.log(this.cloudSpeed);
    },
});
